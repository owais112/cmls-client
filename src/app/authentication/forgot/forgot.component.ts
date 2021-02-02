import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core';
import { Credentials } from 'src/app/core/model/authentication.model';
import { MessageService, Message } from 'primeng/api';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.less']
})
export class ForgotComponent implements OnInit {
  forgotForm: FormGroup;
  isLoading = false;
  msgs: Message[] = [];

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
  ) {
    this.createForm();
  }

  ngOnInit() {
    debugger
  }

  forgot() {
    debugger
    this.isLoading = true;
    this.authenticationService
      .forgot(this.forgotForm.value)
      .pipe(
        finalize(() => {
          this.forgotForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        (credentials: Credentials) => {
          this.msgs = [{severity:'success', summary:'Success', detail: 'Email Send Succesfully'}];
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: `'We have sent a message to ${credentials.email} with instructions to recover your password'` });
          console.log(credentials);
        },
        (error: any) => {
          this.msgs = [{severity:'error', summary:'Warning', detail:'Some error occurs while sending email.'}];
          // this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Some error occurs while reseting email.' });
          console.log(`Forgot error: ${error}`);
        }
      );
  }

  resetPassword() {
    // TODO: Implement Reset Password
  }

  private createForm() {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
}
