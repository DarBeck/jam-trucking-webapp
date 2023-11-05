import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthIntercepterService implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
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
          this.showBadRequestError(err);
        }
        const error = err.error?.message || err.statusText;
        return throwError(err);
      })
    );
  }

  private showBadRequestError(error: any) {
    const isFieldErrorsEmpty = Object.values(error.error?.errors).every(
      (error: any) => !error.length
    );
    if (!isFieldErrorsEmpty) {
      for (const [key, value] of Object.entries(error.error?.errors)) {
        if (Array.isArray(value)) {
          this.toastr.error(value[0], key, {
            progressBar: true,
            toastClass: 'toast ngx-toastr',
            closeButton: true,
            timeOut: 15000,
          });
        }
      }
    } else if (error.error?.title && error.error?.detail) {
      this.toastr.error(error.error.detail, error.error.title, {
        progressBar: true,
        toastClass: 'toast ngx-toastr',
        closeButton: true,
        timeOut: 15000,
      });
    }
  }
}
