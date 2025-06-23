import { Global, Module } from '@nestjs/common';
import { CustomLogger } from './custom-logger.service';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './winston.config';

@Global()
@Module({
  imports: [WinstonModule.forRoot(winstonConfig)],
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class LoggerModule {}
