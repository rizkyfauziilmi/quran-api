import { Module } from '@nestjs/common';
import { SurahService } from './surah.service';
import { SurahController } from './surah.controller';

@Module({
  providers: [SurahService],
  controllers: [SurahController],
})
export class SurahModule {}
