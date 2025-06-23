import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { CustomLogger } from './common/logger/custom-logger.service';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      forbidNonWhitelisted: true,
    }),
  );
  app.useLogger(app.get(CustomLogger));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
