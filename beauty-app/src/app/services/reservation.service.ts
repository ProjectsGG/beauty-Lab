import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HeroService } from './hero.service';
import { Reservation } from '../interfaces/reservation';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient, private hero: HeroService) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  savePayment(data: Reservation) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + this.hero.getToken()
      })
    };
    const url = this.hero.getUrl() + '/reservation';
    return this.http.post(url, data, httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}