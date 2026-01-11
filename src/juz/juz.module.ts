import { Module } from '@nestjs/common';
import { JuzController } from './juz.controller';
import { JuzService } from './juz.service';

@Module({
  controllers: [JuzController],
  providers: [JuzService],
})
export class JuzModule {}
