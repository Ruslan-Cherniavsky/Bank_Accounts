import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { catchError, delay, Observable, throwError, tap } from "rxjs";
import { IActions } from "../models/models";

@Injectable({
    providedIn: 'root'

})

export class AccountsService {
    constructor(
        private http: HttpClient,

    ) {
    }
    myData: IActions[] = []


    getAll(accountNumber: number): Observable<IActions[]> {
        return this.http.get<IActions[]>(`http://localhost:3500/actions/${accountNumber}`, {
            // params: new HttpParams().append('limit', 10)
        }).pipe(
            delay(1000),
            tap((data: any) => this.myData = data),
        )
    }

    create(data: IActions): Observable<IActions> {
        console.log(data)
        return this.http.post<IActions>("http://localhost:3500/postpayload", data)
    }


}