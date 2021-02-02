import { Component, OnInit, OnDestroy } from '@angular/core';
import {SelectItem, MessageService, ConfirmationService, Message} from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core';
import { User } from 'src/app/core/model/authentication.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
  providers: [MessageService,ConfirmationService]
})
export class SignupComponent implements OnInit,OnDestroy {
  activeTab = 'register';
  signupForm: FormGroup;
  isLoading = false;
  msgs: Message[] = [];

    constructor(
        public router: Router,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private messageService: MessageService,) 
        {
            this.createForm();
    }

    ngOnInit() {}

    ngOnDestroy() {
      this.isLoading = false;
    }

    signup() {
      debugger
      if(this.signupForm.valid){
        this.isLoading = true;
        this.authenticationService
          .signup(this.signupForm.value)
          .pipe(
            finalize(() => {
              this.signupForm.markAsPristine();
              this.isLoading = false;
            })
          )
          .subscribe(
            (user: User) => {
              console.log(user);
              this.router.navigate(['/dashboard']);
            },
            (error: any) => {
              if(error.error.errors.msg === 'EMAIL_ALREADY_EXISTS'){
                this.msgs = [{severity:'warn', summary:'Warning', detail:'Email Already Exist.'}];
              }
              else if(error.error.errors.msg[0].msg === 'PASSWORD_TOO_SHORT_MIN_5'){
                this.msgs = [{severity:'warn', summary:'Warning', detail:'Password Too Short'}];
              }
              console.log(`Signup error: ${error}`);
            }
          );
        }else{
          this.msgs = [{severity:'warn', summary:'Warning', detail:'Some fields are missing.'}];
        }
      }
    
      private createForm() {
        this.signupForm = this.formBuilder.group({
          username: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]]
        });
      }

}
