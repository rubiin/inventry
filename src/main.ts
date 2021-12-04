import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());
  app.use(compression());

  await app.listen(config.port);
}
bootstrap();
