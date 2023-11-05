import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/utilities/notification.service';
import * as md5 from 'md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;

  loading: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private notifyService: NotificationService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Attempting to log in');
    this.loading = true;

    var credentials: LoginModel = {
      uid: this.loginForm.get('email')?.value,
      password: md5(this.loginForm.get('password')?.value),
    };

    this.userService.Login(credentials).subscribe(
      (data: any) => {
        console.log(data);
        this.loading = false;

        if (data.Email.toLowerCase() == credentials.uid.toLowerCase()) {
          console.log('Successful Password Verification');

          localStorage.setItem('auth-token', data.Phone);

          this.router.navigateByUrl('/');
        } else {
          this.notifyService.showError(
            'Your Email or Password is Incorrect',
            'Invalid Credentials'
          );
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
          //this.notifyService.showError('Something went wrong', 'Error');
        }
      }
    );
  }
}
