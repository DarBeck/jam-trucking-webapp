import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddDepartmentDto, Department } from '../models/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  GetDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.apiUrl}/department/all`);
  }

  AddDepartment(dto: AddDepartmentDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/department`, dto, {
      observe: 'response',
    });
  }
}
