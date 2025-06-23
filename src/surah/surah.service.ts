import { Injectable } from '@nestjs/common';
import { Surah } from '@prisma/client';
import { QuerySurahsDto } from './dto/surah-query.dto';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SurahService {
  constructor(
    private prismaService: PrismaService,
    private readonly logger: CustomLogger,
  ) {}

  async getAllSurahs(querySurahsDto: QuerySurahsDto): Promise<Surah[]> {
    const { page, limit, classification, juz } = querySurahsDto;
    this.logger.log(
      `Fetching all surahs ${JSON.stringify(querySurahsDto)}`,
      SurahService.name,
    );

    return this.prismaService.surah.findMany({
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
  }

  async countTotalSurahs(querySurahsDto: QuerySurahsDto): Promise<number> {
    const { classification, juz } = querySurahsDto;
    this.logger.log(
      `Counting total surahs ${JSON.stringify(querySurahsDto)}`,
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
