import { Module } from '@nestjs/common';
import { ProductRequestController } from './controllers/product-request/product-request.controller';
import { ProductRequest } from './models/product-request';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRequestService } from './services/product-request/product-request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRequest]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'SI5-CLOUD',
      password: 'SI5-CLOUD',
      database: 'SI5-CLOUD',
      entities: [ProductRequest],
      synchronize: true,
  }),
  ],
  controllers: [ProductRequestController],
  providers: [ProductRequestService],
})
export class AppModule {}
