import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  initializeTransactionalContext();
  await app.listen(3000);
}
bootstrap();
