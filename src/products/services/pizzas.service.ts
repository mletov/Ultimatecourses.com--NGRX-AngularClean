import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import 'rxjs/add/observable/throw';

import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzasService {
  constructor(private http: HttpClient) {}

  public serverName = 'http://localhost:3000'

  getPizzas(): Observable<Pizza[]> {
    return this.http
      .get<Pizza[]>(this.serverName + `/api/pizzas`);
    //  .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .post<Pizza>(this.serverName + `/api/pizzas`, payload);
      //.pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .put<Pizza>(this.serverName + `/api/pizzas/${payload.id}`, payload);
     // .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .delete<any>(this.serverName + `/api/pizzas/${payload.id}`);
    //  .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
