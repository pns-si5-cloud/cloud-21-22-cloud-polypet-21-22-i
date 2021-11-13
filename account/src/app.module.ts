import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './controllers/account/account.controller';
import { AccountService } from './services/account/account.service';
import { Client } from './models/client';
import { Partner } from './models/partner';
import { Employee } from './models/employee';
import { AuthModule } from './auth/auth.module';
import { Account } from './models/account';

const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

@Module({
  imports: [HttpModule,
    TypeOrmModule.forFeature([Client, Partner, Employee, Account]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbSocketPath+"/"+process.env.DB_HOST,
      extra: { socketPath: dbSocketPath+"/"+process.env.DB_HOST },
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Client, Employee, Partner, Account],
      synchronize: true,
  }),
    AuthModule,
],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})
export class AppModule {}
