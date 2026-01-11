import { Injectable, NotFoundException } from '@nestjs/common';
import { Juz } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { JuzWithSurahs } from './types';

@Injectable()
export class JuzService {
  constructor(
    private prismaService: PrismaService,
    private readonly logger: CustomLogger,
  ) {}

  async findAll(): Promise<Juz[]> {
    this.logger.log('Fetching all juzs', JuzService.name);

    return this.prismaService.juz.findMany({
      orderBy: {
        number: 'asc',
      },
    });
  }

  async findOne(number: number): Promise<JuzWithSurahs> {
    this.logger.log(`Fetching juz with number ${number}`, JuzService.name);

    const juz = await this.prismaService.juz.findUnique({
      where: {
        number,
      },
      include: {
        surahs: {
          orderBy: {
            number: 'asc',
          },
        },
      },
    });

    if (!juz) {
      this.logger.error(`Juz with number ${number} not found`, JuzService.name);
      throw new NotFoundException(`Juz with number ${number} not found`);
    }

    return juz;
  }
}
