import { Controller, Get, Param, Query } from '@nestjs/common';
import { Surah } from '@prisma/client';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { SurahQueryDto, SurahsQueryDto } from './dto/surah-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { SurahService } from './surah.service';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { SurahParamDto } from './dto/surah-param.dto';
import { SurahWithAyahsAndTranslation } from 'src/common/types/surah.type';

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
  async getAllSurahs(
    @Query() surahsQueryDto: SurahsQueryDto,
  ): Promise<ApiResponse<{ items: Surah[]; pagination: PaginationDto }>> {
    const surahs = await this.surahService.findAll(surahsQueryDto);

    const totalSurahs = await this.surahService.count(surahsQueryDto);
    const isEmpty = surahs.length === 0;

    const { limit, page } = surahsQueryDto;
    const pagination: PaginationDto = {
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: page + 1 <= Math.ceil(totalSurahs / limit),
      hasPreviousPage: page > 1,
      totalPages: Math.ceil(totalSurahs / limit),
      totalItems: surahs.length,
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
  async getSurahByNumber(
    @Param() surahParamDto: SurahParamDto,
    @Query() surahQueryDto: SurahQueryDto,
  ): Promise<ApiResponse<SurahWithAyahsAndTranslation>> {
    const { number } = surahParamDto;

    const surah = await this.surahService.findByNumber(number, surahQueryDto);

    return new ApiResponse({
      data: surah,
      message: 'Surah retrieved successfully',
      query: surahQueryDto,
    });
  }
}
