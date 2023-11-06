import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyOverview } from '../models/report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  GetCompanyOverview(): Observable<CompanyOverview> {
    return this.http.get<CompanyOverview>(
      `${environment.apiUrl}/reports/company-overview`
    );
  }
}
