import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationService } from '../utilities/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthIntercepterService implements HttpInterceptor {
  constructor(
    private router: Router,
    private notifyService: NotificationService,
    private userService: UserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newHeaders = req.headers;

    // Get token
    const token = this.userService.userData?.token;

    if (token) {
      newHeaders = newHeaders.append('Authorization', token);
    }

    const authReq = req.clone({ headers: newHeaders });

    return next.handle(authReq).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        } else if (err.status === 400) {
          console.log(err);
          console.log("Bad Request");
          this.showBadRequestError(err);
        }
        const error = err.error?.message || err.statusText;
        return throwError(err);
      })
    );
  }

  private showBadRequestError(error: any) {
    console.log("Show Bad Request called");
    const isFieldErrorsEmpty = Object.values(error.error?.errors).every(
      (error: any) => !error.length
    );
    if (!isFieldErrorsEmpty) {
      console.log("Field Errors not empty");
      for (const [key, value] of Object.entries(error.error?.errors)) {
        if (Array.isArray(value)) {
          console.log("Value is array");
          this.notifyService.showError(value[0], key);
        }
      }
    } else if (error.error?.title && error.error?.detail) {
      this.notifyService.showError(error.error.detail, error.error.title);
    }
  }
}
