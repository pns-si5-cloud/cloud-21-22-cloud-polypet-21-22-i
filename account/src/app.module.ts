import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './controllers/account/account.controller';
import { AccountService } from './services/account/account.service';
import { Client } from './models/Client';
import { Partner } from './models/Partner';
import { Employee } from './models/Employee';
import { AuthModule } from './auth/auth.module';

const dbSocketAddr = process.env.DB_HOST?.split(':');

@Module({
  imports: [HttpModule,
    TypeOrmModule.forFeature([Client, Partner, Employee]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbSocketAddr?dbSocketAddr[0]:'database',
      port: dbSocketAddr?+dbSocketAddr[1]:5432,
      username: process.env.DB_USER||'SI5-CLOUD',
      password: process.env.DB_PASS||'SI5-CLOUD',
      database: process.env.DB_NAME||'SI5-CLOUD',
      entities: [Client, Partner, Employee],
      synchronize: true,
  }),
    AuthModule,
],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AppModule {}
