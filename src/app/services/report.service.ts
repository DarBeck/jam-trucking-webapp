import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyOverview, CompanyRevenue } from '../models/report';

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

  GetUnassignedMechanics(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/reports/mechanic/unassigned`
    );
  }

  GetUpcomingMaintenances(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/reports/maintenance/upcoming`
    );
  }

  GetPastDueInvoices(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/reports/invoice/past-due`);
  }

  GetUpcomingRentals(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/reports/rental/upcoming`);
  }

  GetCompanyRevenue(since: string, until: string): Observable<CompanyRevenue[]> {
    return this.http.get<CompanyRevenue[]>(
      `${environment.apiUrl}/reports/company/revenue?since=${since}&until=${until}`
    );
  }
}
