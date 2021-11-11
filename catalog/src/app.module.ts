import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CatalogController } from './controllers/catalog.controller';
import { CatalogService } from './services/catalog.service';
import { Product } from './models/product';

const dbSocketAddr = process.env.DB_HOST?.split(':');

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbSocketAddr?dbSocketAddr[0]:'database',
      port: dbSocketAddr?+dbSocketAddr[1]:5432,
      username: process.env.DB_USER||'SI5-CLOUD',
      password: process.env.DB_PASS||'SI5-CLOUD',
      database: process.env.DB_NAME||'SI5-CLOUD',
      entities: [Product],
      synchronize: true,
    }),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class AppModule {}
