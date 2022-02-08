import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseDataService } from './base-data.service';
import { environment } from 'src/environments/environment';
import { Pivot } from '../model/pivot';

@Injectable({
  providedIn: 'root'
})
export class PivotService extends BaseDataService {
  private pivotsUrl: string = environment.baseUrl + 'technical/pivots'
  private pivotNamesUrl: string = environment.baseUrl + 'technical/pivot/names';

  constructor(private httpClient: HttpClient) { super();}

  getPivotNames(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.pivotNamesUrl)      
      .pipe(catchError(this.handleError));
  }

  getPivots(): Observable<Pivot[]> {
    return this.httpClient.get<Pivot[]>(this.pivotsUrl)
      .pipe(catchError(this.handleError));  
  }
}
