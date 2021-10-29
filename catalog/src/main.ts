import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const dbSocketAddr = process.env.DB_HOST?.split(':');

async function bootstrap() {
  console.log(JSON.stringify({
    type: 'postgres',
    host: dbSocketAddr?dbSocketAddr[0]:'database',
    port: dbSocketAddr?+dbSocketAddr[1]:5432,
    username: process.env.DB_USER||'SI5-CLOUD',
    password: process.env.DB_PASS||'SI5-CLOUD',
    database: process.env.DB_NAME||'SI5-CLOUD',
    entities: [],
    synchronize: true,
  }));
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3003);
  console.log("-------------------------- CATALOG -------------------------");


}
bootstrap();
