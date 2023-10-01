import type { INestApplication } from '@nestjs/common';
import type { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { NestFactory } from '@nestjs/core';
import type { OpenAPIObject } from '@nestjs/swagger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { setGlobalSetting } from './globalSettings';

export const createStandaloneApplication = async (
  options: NestApplicationContextOptions,
) => {
  const app = await NestFactory.createApplicationContext(AppModule, options);

  return app;
};

export const createApplication = async (
  options: NestApplicationContextOptions = {},
) => {
  const app = await NestFactory.create(AppModule, options);
  setGlobalSetting(app);

  return app;
};

export function createSwaggerDocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('Slaughterhouse APIs documents')
    .build();
  return SwaggerModule.createDocument(app, config);
}
