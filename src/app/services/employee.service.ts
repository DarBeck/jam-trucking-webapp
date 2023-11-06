import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddEmployeeDto, Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  GetEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.apiUrl}/employee/all`);
  }

  AddEmployee(dto: AddEmployeeDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/employee`, dto, {
      observe: 'response',
    });
  }
}
