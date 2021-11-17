import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Balance } from 'src/app/classes/balance';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-bank-balance',
  templateUrl: './bank-balance.component.html',
  styleUrls: ['./bank-balance.component.scss']
})
export class BankBalanceComponent implements OnInit {

  constructor(private bankService:BankService) { }
  balance:Balance = new Balance("Loading",[],0);

  ngOnInit(): void {
  }

  async onSubmit(form: NgForm) {
    console.log(form.value);
    const fields = form.value
    const accountID = fields.accountID

    this.balance = await this.bankService.getBalance(accountID);
  }
}
