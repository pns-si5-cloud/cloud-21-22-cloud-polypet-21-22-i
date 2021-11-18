import { Module } from '@nestjs/common';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './models/Delivery';
import { Items } from './models/Items';

const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';


@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Delivery,Items]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbSocketPath+"/"+process.env.DB_HOST,
      extra: { socketPath: dbSocketPath+"/"+process.env.DB_HOST },
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Delivery,Items],
      synchronize: true,
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class AppModule {}
