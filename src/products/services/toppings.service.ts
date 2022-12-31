import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import 'rxjs/add/observable/throw';

import { Topping } from '../models/topping.model';

@Injectable()
export class ToppingsService {
  constructor(private http: HttpClient) {}

  public serverName = 'http://localhost:3000';

  getToppings(): Observable<Topping[]> {
    return this.http
      .get<Topping[]>(this.serverName + `/api/toppings`);
     // .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}