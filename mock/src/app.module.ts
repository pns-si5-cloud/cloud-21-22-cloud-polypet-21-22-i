import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankController } from './bank/bank.controller';
import { BankService } from './bank/bank.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  controllers: [AppController, BankController],
  providers: [AppService, BankService],
})
export class AppModule {}
