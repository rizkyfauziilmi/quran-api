import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SurahModule } from './surah/surah.module';
import { LoggerModule } from './common/logger/logger.module';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { loggingMiddleware, PrismaModule, QueryInfo } from 'nestjs-prisma';
import { JuzModule } from './juz/juz.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'debug',
            logMessage: (query: QueryInfo) =>
              `[Prisma Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
          }),
        ],
      },
    }),
    SurahModule,
    LoggerModule,
    JuzModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
