import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enables the DTO validation we created earlier
  app.useGlobalPipes(new ValidationPipe());
  
  // Enables Frontend connection (Angular/React)
  app.enableCors(); 

  await app.listen(3000);
}
bootstrap();