import { Injectable } from '@nestjs/common';
import { Surah } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuerySurahsDto } from './dto/surah-query.dto';

@Injectable()
export class SurahService {
  constructor(private prismaService: PrismaService) {}

  async getAllSurahs(querySurahsDto: QuerySurahsDto): Promise<Surah[]> {
    const { page, limit, classification, juz } = querySurahsDto;

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

    return this.prismaService.surah.count({
      where: {
        classification: classification ? classification : undefined,
        juzId: juz ? juz : undefined,
      },
    });
  }
}
