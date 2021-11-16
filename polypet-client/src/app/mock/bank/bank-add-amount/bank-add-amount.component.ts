import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-bank-add-amount',
  templateUrl: './bank-add-amount.component.html',
  styleUrls: ['./bank-add-amount.component.scss']
})
export class BankAddAmountComponent implements OnInit {

  constructor(private bankService:BankService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const fields = form.value
    const cardID = fields.cardID
    const amount = fields.amount

    this.bankService.addAmount(cardID,amount);
  }
}
