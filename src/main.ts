import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { AllExceptionFilter } from './error/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalGuards(app.get(AuthGuard));
  app.useGlobalGuards(app.get(AdminGuard));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionFilter());
  app.use('/payment/webhook', express.raw({ type: '*/*' }));
  Logger.overrideLogger(['error']);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
