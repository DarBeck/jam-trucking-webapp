import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddRentalDto, Rental } from '../models/rental';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  constructor(private http: HttpClient) {}

  AddRental(dto: AddRentalDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/rental`, dto, {
      observe: 'response',
    });
  }

  GetRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${environment.apiUrl}/rental/all`);
  }

  GetRental(id: number): Observable<Rental> {
    return this.http.get<Rental>(`${environment.apiUrl}/rental/${id}`);
  }
}
