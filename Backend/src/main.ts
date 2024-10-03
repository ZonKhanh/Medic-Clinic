import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AuthModule } from './modules/auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();