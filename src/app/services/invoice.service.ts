import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice, PayInvoiceDto } from '../models/invoice';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  QueryInvoices(since: string, until: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${environment.apiUrl}/invoice/filter?since=${since}&until=${until}`);
  }

  GetAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${environment.apiUrl}/invoice/all`);
  }

  GetInvoice(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${environment.apiUrl}/invoice/${id}`);
  }

  PayInvoice(payInvoiceDto: PayInvoiceDto): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/invoice/${payInvoiceDto.invoiceId}/pay`,
      payInvoiceDto,
      {
        observe: 'response',
      }
    );
  }
}
