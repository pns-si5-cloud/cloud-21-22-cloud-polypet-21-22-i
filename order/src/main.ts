import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Order')
  .setDescription('Order')
  .setVersion('1.0')
  .addTag('MV')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);  
  await app.listen(3003);
  console.log("-------------------ORDER---------------------")
}
bootstrap();
