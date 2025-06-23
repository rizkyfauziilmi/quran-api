import { Injectable, NotFoundException } from '@nestjs/common';
import { Surah } from '@prisma/client';
import { SurahQueryDto, SurahsQueryDto } from './dto/surah-query.dto';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { PrismaService } from 'nestjs-prisma';
import { SurahWithAyahsAndTranslation } from 'src/common/types/surah.type';

@Injectable()
export class SurahService {
  constructor(
    private prismaService: PrismaService,
    private readonly logger: CustomLogger,
  ) {}

  async findAll(querySurahsDto: SurahsQueryDto): Promise<Surah[]> {
    const { page, limit, classification, juz } = querySurahsDto;
    this.logger.log(
      `Fetching all surahs with query ${JSON.stringify(querySurahsDto)}`,
      SurahService.name,
    );

    const surahs = await this.prismaService.surah.findMany({
      where: {
        classification: classification ? classification : undefined,
        juzId: juz ? juz : undefined,
      },
      orderBy: {
        number: 'asc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    if (surahs.length === 0) {
      this.logger.warn(
        'No surahs found, returning empty array. Try adjusting your query parameters.',
        SurahService.name,
      );
    }

    return surahs;
  }

  async findOne(
    number: number,
    surahQueryDto: SurahQueryDto,
  ): Promise<SurahWithAyahsAndTranslation> {
    this.logger.log(
      `Fetching surah by number ${number} with query ${JSON.stringify(surahQueryDto)}`,
      SurahService.name,
    );

    const { languageCode } = surahQueryDto;

    const surah = await this.prismaService.surah.findUnique({
      where: { number },
      include: {
        ayahs: {
          include: {
            translations: languageCode
              ? {
                  where: {
                    languageCode: Array.isArray(languageCode)
                      ? { in: languageCode }
                      : languageCode,
                  },
                }
              : { where: { languageCode: 'en' } }, // fetch only en if languageCode is not provided
          },
          orderBy: { number: 'asc' },
        },
      },
    });

    if (!surah) {
      this.logger.error(
        `Surah with number ${number} not found`,
        SurahService.name,
      );
      throw new NotFoundException(`Surah with number ${number} not found`);
    }

    return surah;
  }

  async count(querySurahsDto: SurahsQueryDto): Promise<number> {
    const { classification, juz } = querySurahsDto;
    this.logger.log(
      `Counting total surahs with query ${JSON.stringify(querySurahsDto)}`,
      SurahService.name,
    );

    return this.prismaService.surah.count({
      where: {
        classification: classification ? classification : undefined,
        juzId: juz ? juz : undefined,
      },
    });
  }
}
