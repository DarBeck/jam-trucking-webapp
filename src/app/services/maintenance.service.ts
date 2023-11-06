import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddMaintenanceDto, Maintenance } from '../models/maintenance';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  constructor(private http: HttpClient) {}

  GetMaintenances(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(`${environment.apiUrl}/maintenance/all`);
  }

  AddMaintenance(dto: AddMaintenanceDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/maintenance`, dto, {
      observe: 'response',
    });
  }
}
