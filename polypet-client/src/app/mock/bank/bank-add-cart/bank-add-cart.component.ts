import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-bank-add-cart',
  templateUrl: './bank-add-cart.component.html',
  styleUrls: ['./bank-add-cart.component.scss']
})
export class BankAddCartComponent implements OnInit {

  constructor(private bankService:BankService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const fields = form.value
    const accountID = fields.accountID
    const cardID = fields.cardID

    this.bankService.addCard(accountID,cardID);
  }
}
