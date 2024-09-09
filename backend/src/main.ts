import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Database tests for ISCC')
    .setDescription('This api is used to test performance of diffrent databases for storing and managing ISCC units.')
    .setVersion('1.0')
    .addTag('Milvus')
    .addTag('PostgreSQL')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(8080);
}
bootstrap();
