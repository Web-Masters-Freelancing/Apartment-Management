import { type INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';

import { createApplication, createSwaggerDocument } from './create-application';

let app: INestApplication;
async function bootstrap() {
  app = await createApplication();

  const document = createSwaggerDocument(app);
  await writeFile('./swagger.json', JSON.stringify(document, null, '  '));

  SwaggerModule.setup('api/swagger', app, document);

  const port = Number(process.env.PORT) || 3031;
  await app.listen(port);
}

bootstrap();
