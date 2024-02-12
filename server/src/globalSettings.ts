import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { json, raw, text, urlencoded } from 'express';
import { LoggerErrorInterceptor } from 'nestjs-pino';

export const setGlobalSetting = (app: INestApplication) => {
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      disableErrorMessages: false,
    }),
  );
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.use(json({ limit: '50mb' }));
  app.use(raw({ limit: '50mb' }));
  app.use(text({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  app.enableCors();
  // response compression
  app.use(compression());

  return app;
};
