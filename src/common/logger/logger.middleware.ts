import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomLogger } from './custom-logger.service';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        'HTTP',
      );
      if (method !== 'GET') {
        this.logger.debug(req.body);
      }
    });

    next();
  }
}
