import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivePriceService {

  private dataUrl = environment.socketUrl + 'Data';
  private weatherUrl = environment.baseUrl + 'WeatherForecast';

  constructor(private http: HttpClient) { }

  start() {
    return this.http.get<void>(this.dataUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  start2() {
    return this.http.get<any>(this.weatherUrl)
    .pipe(
      catchError(this.handleError)
    );

  }
  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
