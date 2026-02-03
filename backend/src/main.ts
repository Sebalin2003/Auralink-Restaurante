import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security Headers
  app.use(helmet());

  // CORS
  app.enableCors({
    origin: process.env.NODE_ENV === 'production'
      ? [/aurarestaurante\.com$/]
      : true, // Allow all in dev/staging
    credentials: true,
  });

  // Input Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
