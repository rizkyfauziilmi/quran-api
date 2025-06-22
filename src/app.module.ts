import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SurahModule } from './surah/surah.module';

@Module({
  imports: [PrismaModule, SurahModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
