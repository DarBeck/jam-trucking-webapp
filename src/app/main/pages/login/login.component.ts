import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginModel, User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/utilities/notification.service';
import * as md5 from 'md5';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;

  loading: boolean = false;
  returnUrl: string = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private notifyService: NotificationService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('user');
    this.userService.updateUser(null);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  onSubmit() {
    console.log('Attempting to log in');
    this.loading = true;

    var credentials: LoginModel = {
      uid: this.loginForm.get('email')?.value,
      password: md5(this.loginForm.get('password')?.value),
    };

    this.authService.Login(credentials).subscribe(
      (response) => {
        this.loading = false;

        if (response.status == 200) {
          this.router.navigate(['/login-mfa/' + response.body.continuationTokens], {
            queryParams: { returnUrl: this.returnUrl },
          });
        }
      },
      (error: any) => {
        if (error.status == 401) {
          this.loading = false;
          console.log(error);
          this.notifyService.showError(
            'Your Email or Password is Incorrect',
            'Invalid Credentials'
          );
        } else {
          this.loading = false;
          console.log(error);
          this.notifyService.showError(
            'Your Email or Password is Incorrect',
            'Invalid Credentials'
          );
        }
      }
    );
  }
}
