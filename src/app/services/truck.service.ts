import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddTruckDto } from '../models/truck';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TruckService {
  constructor(private http: HttpClient) {}

  AddTruck(dto: AddTruckDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/truck`, dto, {
      observe: 'response',
    });
  }
}
