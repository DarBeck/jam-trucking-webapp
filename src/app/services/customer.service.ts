import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddCustomerDto, Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  AddCustomer(dto: AddCustomerDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/customer`, dto, {
      observe: 'response',
    });
  }

  GetCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiUrl}/customer/all`);
  }
}
