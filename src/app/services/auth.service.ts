import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  Login(credentials: LoginModel): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, credentials, {
      observe: 'response',
    });
  }
}
