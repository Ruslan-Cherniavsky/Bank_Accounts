import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  constructor(private accountsService: AccountsService,
    private modalService: ModalService
  ) {

  }

  withdrawal = true
  deposit = false
  hypothec = false


  form = new FormGroup({
    account_number: new FormControl<number | null>(null),
    deposit_sum: new FormControl<number | null>(null),
    withdrawal_sum: new FormControl<number | null>(null),
    hypothec_sum: new FormControl<number | null>(null),
    commission: new FormControl<number | null>(null),
    payments: new FormControl<number | null>(null),
  })


  ngOnInit(): void {
  }

  submit() {
    this.accountsService.create({

      action_id: Math.floor(Math.random() * 963333),
      account_number: this.form.value.account_number as number,
      deposit_sum: this.form.value.deposit_sum as number,
      withdrawal_sum: this.form.value.withdrawal_sum as number,
      hypothec_sum: this.form.value.hypothec_sum as number,
      commission: this.form.value.commission as number,
      payments: this.form.value.payments as number,

  

      // account_number: this.form.value as number,
      // payments: 123,
      // action_id: Math.floor(Math.random() * 963333),
    }).subscribe(() => {
      this.modalService.close()
    })

  }


  withdrawalHandler(): void {
    this.withdrawal = true
    this.deposit = false
    this.hypothec = false
  }
  depositHandler(): void {
    this.withdrawal = false
    this.deposit = true
    this.hypothec = false
  }
  hypotheclHandler(): void {
    this.withdrawal = false
    this.deposit = false
    this.hypothec = true
  }
}
