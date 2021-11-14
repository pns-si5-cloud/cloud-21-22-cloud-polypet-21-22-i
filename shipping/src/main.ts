import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const dbSocketAddr = process.env.DB_HOST?.split(':');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(process.env.PORT || 3007);
  console.log("-------------------------- SHIPPING -------------------------");
}
bootstrap();
