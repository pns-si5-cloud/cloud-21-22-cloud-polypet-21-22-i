import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-bank-balance',
  templateUrl: './bank-balance.component.html',
  styleUrls: ['./bank-balance.component.scss']
})
export class BankBalanceComponent implements OnInit {

  constructor(private bankService:BankService) { }
  balance:string = "_";

  ngOnInit(): void {
  }

  async onSubmit(form: NgForm) {
    console.log(form.value);
    const fields = form.value
    const accountID = fields.accountID

    console.log(this.balance)
    this.balance = await this.bankService.getBalance(accountID);
    console.log(this.balance)
  }
}
