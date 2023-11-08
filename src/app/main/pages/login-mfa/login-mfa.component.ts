import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/utilities/notification.service';

@Component({
  selector: 'app-login-mfa',
  templateUrl: './login-mfa.component.html',
  styleUrls: ['./login-mfa.component.scss'],
})
export class LoginMfaComponent implements OnInit {
  mfaForm: UntypedFormGroup;
  loading: boolean = false;
  returnUrl: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private notifyService: NotificationService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.mfaForm = this.formBuilder.group({
      otp: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    console.log('Attempting to log in');
    this.loading = true;

    let otp = this.mfaForm.get('otp')?.value;

    this.authService.VerifyOtp(otp).subscribe(
      (response) => {
        this.loading = false;

        if (response.status == 200) {
          let user: User = {
            id: response.body.user.id,
            userId: response.body.user.userId,
            firstName: response.body.user.firstName,
            lastName: response.body.user.lastName,
            email: response.body.user.email,
            isSupervisor: response.body.user.isSupervisor,
            role: response.body.user.role,
            token: 'Bearer ' + response.body.token,
          };

          localStorage.setItem('user', JSON.stringify(user));
          this.userService.updateUser(user);
          this.router.navigateByUrl(this.returnUrl);
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
