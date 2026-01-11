import { Controller, Get, Param, Query } from '@nestjs/common';
import { Surah } from '@prisma/client';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { SurahService } from './surah.service';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { SurahParamDto, SurahQueryDto, SurahsQueryDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { SurahWithAyahsAndTranslations } from './types';

@Controller({
  version: '1',
  path: 'surahs',
})
export class SurahController {
  constructor(
    private surahService: SurahService,
    private readonly logger: CustomLogger,
  ) {}

  @Get('/')
  async getSurahs(
    @Query() surahsQueryDto: SurahsQueryDto,
  ): Promise<ApiResponse<{ items: Surah[]; pagination: PaginationDto }>> {
    const surahs = await this.surahService.findAll(surahsQueryDto);

    const totalSurahs = await this.surahService.count(surahsQueryDto);
    const isEmpty = totalSurahs === 0;

    const { limit, page } = surahsQueryDto;
    const pagination: PaginationDto = {
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: page + 1 <= Math.ceil(totalSurahs / limit),
      hasPreviousPage: page > 1,
      totalPages: Math.ceil(totalSurahs / limit),
      totalItems: totalSurahs,
    };

    return new ApiResponse({
      data: {
        items: surahs,
        pagination,
      },
      message: isEmpty
        ? 'Surah not found with given query'
        : 'Surahs retrieved successfully',
      query: surahsQueryDto,
    });
  }

  @Get(':number')
  async getSurah(
    @Param() surahParamDto: SurahParamDto,
    @Query() surahQueryDto: SurahQueryDto,
  ): Promise<ApiResponse<SurahWithAyahsAndTranslations>> {
    const { number } = surahParamDto;

    const surah = await this.surahService.findOne(number, surahQueryDto);

    return new ApiResponse({
      data: surah,
      message: 'Surah retrieved successfully',
      query: surahQueryDto,
    });
  }
}
