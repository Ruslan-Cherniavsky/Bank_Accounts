import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error$ = new Subject()

  handle(massage: string) {

    this.error$.next(massage)
  }
  clear() {
    this.error$.next('')
  }

}
