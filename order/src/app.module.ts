import { MiddlewareConsumer, Module } from '@nestjs/common';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './models/Delivery';
import { Items } from './models/Items';
import { JwtDecodeMiddleware } from './middlewares/jwt-decode.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  controllers: [AppController,OrderController],
  providers: [AppService,OrderService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtDecodeMiddleware)
      .forRoutes(
        'order/proceed-to-payment'
      );
  }
}
