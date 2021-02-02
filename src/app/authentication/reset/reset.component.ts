import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core';
import { Credentials } from 'src/app/core/model/authentication.model';
import { MessageService, Message } from 'primeng/api';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  resetForm: FormGroup;
  isLoading = false;
  msgs: Message[] = [];
  id: any;
  private sub: any;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  ngOnInit() {
    debugger
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
   });
    this.resetForm.patchValue({
      id: this.id,
    });
  }

  resetPassword() {
    debugger
    this.isLoading = true;
    this.authenticationService.resetPassword(this.resetForm.value)
      .pipe(
        finalize(() => {
          this.resetForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        (credentials: Credentials) => {
          this.msgs = [{severity:'success', summary:'Success', detail: `'Password Reset Successfully'`}];
          this.router.navigate(['/login'], {
            replaceUrl: true
          });
          console.log(credentials);
        },
        (error: any) => {
          this.msgs = [{severity:'error', summary:'Warning', detail:'Some error occurs while changing password.'}];
          console.log(`Forgot error: ${error}`);
        }
      );
  }

  private createForm() {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      id: ['', [Validators.required]],
      }, {
          validator: this.matchPassword
      });
  }

  matchPassword(control: AbstractControl) {
    let password = control.get('password').value;
    let confirmPassword = control.get('confirmPassword').value;
    if (password != confirmPassword) {
      control.get('confirmPassword').setErrors({ ConfirmPassword: true });
    }
    else {
      return null;
    }
  }
}