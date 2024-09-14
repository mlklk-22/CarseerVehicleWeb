import { Inject, Injectable, PLATFORM_ID  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  private baseUrl = environment.baseUrl + "api/Vehicles"

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any,) { }

  getCarMakes(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
    const url = `${this.baseUrl}/GetAllMakes`;
    return this.http.get<any>(url).pipe(
        catchError(this.handleError));
    }
    else{
      return of([]);
    }
  }

  getVehicleTypes(makeId: number): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
    const url = `${this.baseUrl}/GetVehicleTypesByMakeId/${makeId}`;
    return this.http.get<any>(url).pipe(
        catchError(this.handleError));
    }
    else{
      return of([]);
    }
  }

  getCarModels(makeId: number, year: number): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
    const url = `${this.baseUrl}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}`;
    return this.http.get<any>(url).pipe(
        catchError(this.handleError));
    }
    else{
      return of([]);
    }
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
