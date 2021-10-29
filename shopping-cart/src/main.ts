import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Shopping-cart')
    .setDescription('Shopping-cart')
    .setVersion('1.0')
    .addTag('MV')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3001);
  console.log(
    '-------------------------- SHOPPING-CART -------------------------',
  );
}
bootstrap();
