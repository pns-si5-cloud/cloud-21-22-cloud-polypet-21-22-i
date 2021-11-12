import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from 'models/Delivery';
import { Items } from 'models/Items';
import { ShippingController } from './shipping/shipping.controller';
import { ShippingService } from './shipping/shipping.service';

const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

@Module({
  imports: [
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
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class AppModule {}
