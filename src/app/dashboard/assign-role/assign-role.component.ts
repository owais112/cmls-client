import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message, MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core';
import { BreadcrumbService } from 'src/app/core/service/babylon/breadcrumb.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AssignRoleComponent implements OnInit {
  rolesForm: FormGroup;
  isLoading = false;
  submitted = false;
  roleDD: any[] = [];
  msgs: Message[] = [];
  isAdmin: boolean;

  
  constructor(public router: Router,
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService) {
      this.breadcrumbService.setItems([
        { label: 'Dashboard' },
        { label: 'Assign Role', routerLink: ['/dashboard/create-student'] }
      ]);
    this.createForm();
   }

   get f() { return this.rolesForm.controls; }

  ngOnInit() {
    this.isAdmin = this.authenticationService.credentials.user.role && this.authenticationService.credentials.user.role === 'admin' ? true : false;
    if(!this.isAdmin){
      this.msgs = [{severity:'warn', summary:'Warning', detail:'You are not authorized user.'}];
      return;
    }
    this.isLoading = true;
    this.roleDD.push({ label: 'User', value: 'user' });
    this.roleDD.push({ label: 'Admin', value: 'admin' });
    this.isLoading = false;
  }

  private createForm() {
    this.rolesForm = this.formBuilder.group({
      role: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSaveRole() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to save?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.createRole();
        // this.msgs = [{severity:'info', summary:'Confirmed', detail:'Saved Successfully.'}];
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'Some Error Occured.'}];
      }
    });
  }

  createRole() {
    debugger
    this.isLoading = true;
    const invalid = [];
    const controls = this.rolesForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    if(invalid.length > 0){
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: `${invalid[0]} is missing.` });
      this.isLoading = false;
    return;
    }
    if (this.rolesForm.valid) {

      this.isLoading = true;
      this.authenticationService.assignRole(this.rolesForm.value)
        .pipe(
          finalize(() => {
            this.rolesForm.markAsPristine();
            setTimeout(() => {
              this.isLoading = false;
              }, 1000);
          })
        )
        .subscribe(
          (response: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Role Assign Successfully' });
            console.log(response);
            setTimeout(() => {
              this.router.navigate(['/dashboard/student/studentrecords'], {
                replaceUrl: true
              });
            }, 2000);
          },
          (error: any) => {
            if(error.error.errors.msg === 'EMAIL_ALREADY_EXISTS' || error.error.errors.msg.includes('duplicate key error collection')){
              this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Email Already Exist' });
            }else{
              this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Some error occurs while saving' });
            }
            console.log(`Login error: ${error}`);
          }
        );
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Some error occurs while saving' });
      setTimeout(() => {
        this.isLoading = false;
        }, 1000);
    }
  }

  onReset() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to clear fields?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.reset();
      },
      reject: () => {
      }
  });
  
  }
  
  reset(){
    this.submitted = false;
    this.rolesForm.reset();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Clear Successfully' });
  }

}
