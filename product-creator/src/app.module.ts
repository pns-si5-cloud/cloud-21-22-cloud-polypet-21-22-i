import { Module } from '@nestjs/common';
import { ProductRequestController } from './controllers/product-request/product-request.controller';
import { ProductRequest } from './models/product-request';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRequestService } from './services/product-request/product-request.service';
import { HttpModule } from '@nestjs/axios';

const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

@Module({
  imports: [HttpModule,
    TypeOrmModule.forFeature([ProductRequest]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbSocketPath+"/"+process.env.DB_HOST,
      extra: { socketPath: dbSocketPath+"/"+process.env.DB_HOST },
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [ProductRequest],
      synchronize: true,
  }),
  ],
  controllers: [ProductRequestController],
  providers: [ProductRequestService],
})
export class AppModule {}
