import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Item } from './models/Item';
import { Cart } from './models/Cart';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCartController } from './controllers/shopping-cart.controller';

const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Cart, Item]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbSocketPath+"/"+process.env.DB_HOST,
      extra: { socketPath: dbSocketPath+"/"+process.env.DB_HOST },
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Cart, Item],
      synchronize: true,
    }),
  ],
  controllers: [AppController, ShoppingCartController],
  providers: [AppService, ShoppingCartService],
})
export class AppModule {}
