import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core';
import { Credentials } from 'src/app/core/model/authentication.model';
import { Message } from 'primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit,OnDestroy {
  loginForm: FormGroup;
  resetPasswordForm: FormGroup;
  isLoading = false;
  apiErrorMessage: boolean = false;
  msgs: Message[] = [];
  
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    debugger
  }

  login() {
    debugger
    this.isLoading = true;
    this.authenticationService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          setTimeout(() => {
          this.isLoading = false;
          }, 1000);
        })
      )
      .subscribe(
        (credentials: Credentials) => {
          console.log(credentials);
          this.apiErrorMessage = false;
          this.router.navigate(['/'], {
            replaceUrl: true
          });
        },
        (error: any) => {
          this.msgs = [{severity:'error', summary:'Warning', detail:'Invalid Email or Password.'}];
          this.apiErrorMessage = true;
          console.log(`Login error: ${error}`);
        }
      );
  }

  resetPassword() {
    // TODO: Implement Reset Password
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    // this.resetPasswordForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]]
    // });
  }

  ngOnDestroy() {
    this.isLoading = false;
  }
}
