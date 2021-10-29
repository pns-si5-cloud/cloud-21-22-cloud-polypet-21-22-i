import { Module } from '@nestjs/common';
import { ProductRequestController } from './controllers/product-request/product-request.controller';
import { ProductRequest } from './models/product-request';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRequestService } from './services/product-request/product-request.service';

const dbSocketAddr = process.env.DB_HOST?.split(':');

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRequest]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbSocketAddr?dbSocketAddr[0]:'database',
      port: dbSocketAddr?+dbSocketAddr[1]:5432,
      username: process.env.DB_USER||'SI5-CLOUD',
      password: process.env.DB_PASS||'SI5-CLOUD',
      database: process.env.DB_NAME||'SI5-CLOUD',
      entities: [ProductRequest],
      synchronize: true,
  }),
  ],
  controllers: [ProductRequestController],
  providers: [ProductRequestService],
})
export class AppModule {}
