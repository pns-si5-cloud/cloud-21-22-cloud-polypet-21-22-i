import { Module } from '@nestjs/common';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './models/Delivery';
import { Items } from './models/Items';
const dbSocketAddr = process.env.DB_HOST?.split(':');
@Module({
  imports: [    HttpModule,
    TypeOrmModule.forFeature([Delivery,Items]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbSocketAddr?dbSocketAddr[0]:'database',
      port: dbSocketAddr?+dbSocketAddr[1]:5432,
      username: process.env.DB_USER||'SI5-CLOUD',
      password: process.env.DB_PASS||'SI5-CLOUD',
      database: process.env.DB_NAME||'SI5-CLOUD',
      entities: [Delivery,Items],
      synchronize: true,
    }),],
  controllers: [OrderController],
  providers: [OrderService],
})
export class AppModule {}
