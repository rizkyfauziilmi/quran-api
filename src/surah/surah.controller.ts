import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { Surah } from '@prisma/client';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { QuerySurahsDto } from './dto/surah-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { SurahService } from './surah.service';

@Controller('/api/surahs')
export class SurahController {
  constructor(private surahService: SurahService) {}

  @Get('/')
  async getAllSurahs(
    @Query() querySurahsDto: QuerySurahsDto,
  ): Promise<ApiResponse<{ items: Surah[]; pagination: PaginationDto }>> {
    const surahs = await this.surahService.getAllSurahs(querySurahsDto);

    if (surahs.length === 0) {
      throw new NotFoundException('No Surahs found');
    }

    const totalSurahs =
      await this.surahService.countTotalSurahs(querySurahsDto);

    const pagination: PaginationDto = {
      currentPage: querySurahsDto.page,
      nextPage: querySurahsDto.page + 1,
      previousPage: querySurahsDto.page - 1,
      hasNextPage:
        querySurahsDto.page + 1 <=
        Math.ceil(totalSurahs / querySurahsDto.limit),
      hasPreviousPage: querySurahsDto.page > 1,
      totalPages: Math.ceil(totalSurahs / querySurahsDto.limit),
      totalItems: surahs.length,
    };

    return new ApiResponse({
      data: {
        items: surahs,
        pagination,
      },
      message: 'Surahs retrieved successfully',
      query: querySurahsDto,
    });
  }
}
