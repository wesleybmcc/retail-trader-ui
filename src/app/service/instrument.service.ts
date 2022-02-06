import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Instrument, InstrumentType } from '../model/instrument';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {
  private instrumentUrl = environment.baseUrl + 'Instrument';
  private instrumentTypeUrl = environment.baseUrl + 'InstrumentType';

  constructor(private httpClient: HttpClient) {}

  getInstruments(): Observable<Instrument[]> {    
    return this.httpClient.get<Instrument[]>(this.instrumentUrl)
    .pipe(
      catchError(this.handleError)
    );
  }

  getInstrumentTypes(): Observable<InstrumentType[]> {
    return this.httpClient.get<InstrumentType[]>(this.instrumentTypeUrl)
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

