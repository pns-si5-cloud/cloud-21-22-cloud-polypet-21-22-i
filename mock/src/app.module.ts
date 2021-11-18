import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankController } from './bank/bank.controller';
import { BankService } from './bank/bank.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './models/Card';

const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

@Module({
  imports: [HttpModule,
    TypeOrmModule.forFeature([Card]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbSocketPath + '/' + process.env.DB_HOST,
      extra: { socketPath: dbSocketPath + '/' + process.env.DB_HOST },
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Card],
      synchronize: true,
    }),],
  controllers: [AppController, BankController],
  providers: [AppService, BankService],
})
export class AppModule {}
