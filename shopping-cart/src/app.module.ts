import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Item } from './models/Item';
import { Cart } from './models/Cart';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCartController } from './controllers/shopping-cart.controller';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Cart, Item]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'SI5-CLOUD',
      password: 'SI5-CLOUD',
      database: 'SI5-CLOUD',
      entities: [Cart, Item],
      synchronize: true,
    }),
  ],
  controllers: [AppController, ShoppingCartController],
  providers: [AppService, ShoppingCartService],
})
export class AppModule {}
