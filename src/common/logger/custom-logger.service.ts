import { Injectable, LoggerService } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLoggerType } from 'winston';

@Injectable()
export class CustomLogger implements LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly winston: WinstonLoggerType,
  ) {}

  private formatMessage(message: unknown): string {
    if (typeof message === 'string') return message;
    try {
      return JSON.stringify(message, null, 2);
    } catch {
      return '[Unserializable object]';
    }
  }

  log(message: unknown, context?: string) {
    this.winston.info(this.formatMessage(message), { context });
  }

  error(message: unknown, trace?: string, context?: string) {
    this.winston.error(this.formatMessage(message), { trace, context });
  }

  warn(message: unknown, context?: string) {
    this.winston.warn(this.formatMessage(message), { context });
  }

  debug(message: unknown, context?: string) {
    this.winston.debug(this.formatMessage(message), { context });
  }

  verbose(message: unknown, context?: string) {
    this.winston.verbose(this.formatMessage(message), { context });
  }
}
