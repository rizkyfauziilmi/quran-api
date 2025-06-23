import { Controller, Get, Param } from '@nestjs/common';
import { JuzService } from './juz.service';
import { ApiResponse } from 'src/common/dto';
import { Juz } from '@prisma/client';
import { JuzParamDto } from './dto';
import { JuzWithSurahs } from './types';

@Controller({
  version: '1',
  path: 'juzs',
})
export class JuzController {
  constructor(private juzService: JuzService) {}

  @Get('/')
  async getJuzs(): Promise<ApiResponse<Juz[]>> {
    const juzs = await this.juzService.findAll();

    return new ApiResponse({
      message: 'Juzs retrieved successfully',
      data: juzs,
    });
  }

  @Get(':number')
  async getJuz(
    @Param() juzParamDto: JuzParamDto,
  ): Promise<ApiResponse<JuzWithSurahs>> {
    const { number } = juzParamDto;

    const juz = await this.juzService.findOne(number);

    return new ApiResponse({
      message: 'Juz retrieved successfully',
      data: juz,
    });
  }
}
