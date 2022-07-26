import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { IActions } from './models/models';
import { ModalService } from './services/modal.service';
import { AccountsService } from './services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'My bank account actions:';

  loading = false

  actions$: Observable<IActions[]>

  constructor(private accountsService: AccountsService,
    public modalService: ModalService

  ) {
  }

  ngOnInit(): void {
  }

  accountForm = new FormGroup({
    myTitle: new FormControl<any>('')
  })

  accountSubmit() {
    this.loading = true

    this.actions$ = this.accountsService.getAll(this.accountForm.value.myTitle as any).pipe(
      tap(() => this.loading = false)

    )
    console.log(this.accountForm.value)

  }

}
