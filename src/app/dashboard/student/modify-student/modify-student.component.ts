import {Component, OnInit, OnDestroy} from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { BreadcrumbService } from 'src/app/core/service/babylon/breadcrumb.service';
import { MessageService, Message } from 'primeng/api';
import { AuthenticationService } from 'src/app/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { finalize, filter, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { SharedService } from '../service/shared.service';
import { Email, QualificationTitleDD } from '../create-student/model/create-student.model';
import { AttachmentPath } from './model/modify-student.model';

@Component({
  selector: 'app-modify-component',
  templateUrl: './modify-student.component.html',
  styleUrls: ['./modify-student.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ModifyStudentComponent implements OnInit,OnDestroy {

  bTitleDD: any[] = [];
  checkPaidDD: any[] = [];
  installmentDD: any[] = [];
  uploadedFiles: any[] = [];
  // uploadedFiles: any;
  msgs: Message[] = [];
  selectedStudentData: any;
  messages: any[] = [];
  subscription: Subscription;
  email: Email;
  isPaid: boolean = true;


  createStudentForm: FormGroup;
  emailForm: FormGroup;
  isLoading = false;
  submitted = false;

  qualificationTitleDD = QualificationTitleDD;

  // File Upload
  selectedFiles: File;
  currentFileUpload: File;
  objCirriculumVitae: any;
  progress: { percentage: number } = { percentage: 0 };
  showFile = false;
  fileUploads: Observable<string[]>;
  attachmentPath: AttachmentPath;

  public show:boolean = false;

  constructor(private breadcrumbService: BreadcrumbService,
      private messageService: MessageService,
      public router: Router,private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private modifyStudentService: AuthenticationService, 
      private confirmationService: ConfirmationService,
      private sharedService: SharedService) {
        debugger
        this.email = new Email();
        this.attachmentPath = new AttachmentPath();
        this.subscription = this.sharedService.getMessage().subscribe(message => {
          debugger
          if (message) {
            if(message.attachmentPath){
              this.attachmentPath = message.attachmentPath;
            }
            if(message.checkPaid === 'Paid'){
              this.isPaid = true;
            }else{
              this.isPaid = false;
            }
            if(message.checkPaid === 'UnPaid' && message.installments && message.installments.length > 0){
              var installmentArray = [];
              for (let index = 0; index < message.installments.length; index++) {
                var installmentObj = {
                  iPaidDate : new Date(message.installments[index].iPaidDate),
                  iamount : message.installments[index].iamount,
                  iCheckPaid : message.installments[index].iCheckPaid,
                };
                installmentArray.push(installmentObj);
              }
            }
            this.createStudentForm.patchValue({
              createdBy: message.createdBy,
              dob: new Date(message.dob),
              email: message.email,
              feeOffered: message.feeOffered,
              firstName: message.firstName,
              gender: message.gender,
              homeAddress: message.homeAddress,
              installment: message.installment,
              isDeleted: message.isDeleted,
              lastName: message.lastName,
              mobile: message.mobile,
              phone: message.phone,
              modifiedBy: message.modifiedBy,
              qActualDate: new Date(message.qActualDate),
              qExpectedDate: new Date(message.qExpectedDate),
              totalFee: message.totalFee,
              qStartDate: new Date(message.qStartDate),
              qualificationTitle: message.qualificationTitle,
              regNo: message.regNo,
              satelliteCenter: message.satelliteCenter,
              sureName: message.sureName,
              titleName: message.titleName,
              workAddress: message.workAddress,
              checkPaid: message.checkPaid,
              _id: message._id,
              fPaidDate: new Date(message.fPaidDate),
              // installments: installmentArray,
              attachmentPath: message.attachmentPath
            });
            setTimeout(() => {
            this.isLoading = false;
            }, 1000);
            this.createStudentForm.controls['installments'] = this.formBuilder.array(installmentArray.map(i => this.formBuilder.group(i)));
          } else {
            this.messages = [];
              this.isLoading = false;
          }
        });
      this.breadcrumbService.setItems([
          { label: 'Dashboard' },
          { label: 'Modify Student', routerLink: ['/dashboard/modify-student'] }
      ]);
      this.createForm();
  }

  get f() { return this.createStudentForm.controls; }
  get i() { return this.f.installments as FormArray; }

  ngOnInit() {
    this.isLoading = true;
      this.bTitleDD = [];
      this.bTitleDD.push({ label: 'Mr.', value: 'Mr.' });
      this.bTitleDD.push({ label: 'Miss', value: 'Miss' });

      this.checkPaidDD = [];
      this.checkPaidDD.push({ label: 'Paid', value: 'Paid' });
      this.checkPaidDD.push({ label: 'UnPaid', value: 'UnPaid' });

      this.installmentDD = [];
      this.installmentDD.push({ label: 1, value: 1 });
      this.installmentDD.push({ label: 2, value: 2 });
      this.installmentDD.push({ label: 3, value: 3 });
      this.installmentDD.push({ label: 4, value: 4 });
      this.installmentDD.push({ label: 5, value: 5 });
      this.installmentDD.push({ label: 6, value: 6 });
      this.installmentDD.push({ label: 7, value: 7 });
      this.installmentDD.push({ label: 8, value: 8 });
      this.installmentDD.push({ label: 9, value: 9 });
      this.installmentDD.push({ label: 10, value: 10 });
  }

onSaveStudent(){
  this.confirmationService.confirm({
      message: 'Are you sure that you want to save?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.modifyStudent();
          // this.msgs = [{severity:'info', summary:'Confirmed', detail:'Saved Successfully.'}];
      },
      reject: () => {
          // this.msgs = [{severity:'info', summary:'Rejected', detail:'Some Error Occured.'}];
      }
  });
}

private createForm() {
  this.createStudentForm = this.formBuilder.group({
    _id: ['', [Validators.required]],
    regNo: ['', [Validators.required]],
    satelliteCenter: ['', [Validators.required]],
    titleName: ['', [Validators.required]],
    sureName: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    homeAddress: ['', [Validators.required]],
    workAddress: ['', [Validators.required]],
    mobile: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    qualificationTitle: ['', [Validators.required]],
    qStartDate: ['', [Validators.required]],
    qExpectedDate: ['', [Validators.required]],
    qActualDate: ['', [Validators.required]],
    totalFee: [null, [Validators.required]],
    feeOffered: [null, [Validators.required]],
    checkPaid: ['', [Validators.required]],
    fPaidDate: ['', [Validators.required]],
    installment: [null, [Validators.required]],
    createdBy: ['', [Validators.required]],
    modifiedBy: ['', [Validators.required]],
    isDeleted: [false, [Validators.required]],
    installments: this.formBuilder.array([this.installments]),
    // subject : ['', [Validators.required]],
    // message : ['', [Validators.required]],
    attachmentPath: [null],
  });
  this.emailForm = this.formBuilder.group({
    subject : ['', [Validators.required]],
    message : ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    });
  // this.createStudentForm.controls['regNo'].disable();
}

get installments(): FormGroup {
  return this.formBuilder.group({
    iamount: [null],
    iPaidDate: [''],
    iCheckPaid:[null],
  });
}

modifyStudent() {
  debugger
  this.isLoading = true;
  // if(!(this.attachmentPath && (this.attachmentPath.cirriculumVitae || this.attachmentPath.courseCompletion || this.attachmentPath.enrollmentLetter ||
  //   this.attachmentPath.feedbackForm || this.attachmentPath.offerLetter || this.attachmentPath.otherLetter 
  //   || this.attachmentPath.transcript || this.attachmentPath.warningLetter || this.attachmentPath.withDrawalLetter))){
  //   this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Attachments are missing.' });
  //   return;
  // }
  this.createStudentForm.patchValue({
    modifiedBy: 'Admin',
    attachmentPath: this.attachmentPath,
    installment: this.createStudentForm.value.installment ? this.createStudentForm.value.installment : 1
  });
  const invalid = [];
    const controls = this.createStudentForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    if(invalid.length > 0){
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: `${invalid[0]} is missing.` });
    return;
    }
   if (this.createStudentForm.valid) {

    this.isLoading = true;
    this.modifyStudentService.modifyStudent(this.createStudentForm.value)
      .pipe(
        finalize(() => {
          this.createStudentForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        (response: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Successfully' });
          console.log(response);
          setTimeout(() => {
            this.router.navigate(['/dashboard/student/studentrecords'], {
              replaceUrl: true
            });
          }, 2000);
          this.isLoading = false;
        },
        (error: any) => {
          if(error.error.errors.msg === 'EMAIL_ALREADY_EXISTS' || error.error.errors.msg.includes('duplicate key error collection')){
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Email Already Exist' });
          }else{
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Some error occurs while saving' });
          }
          console.log(`Login error: ${error}`);
          this.isLoading = false;
        }
      );
  }else{
    this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Some error occurs while updating' });
    this.isLoading = false;
  }
}

onDeleteStudent(){
  this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.deleteStudent();
          // this.msgs = [{severity:'info', summary:'Confirmed', detail:'Saved Successfully.'}];
      },
      reject: () => {
          // this.msgs = [{severity:'info', summary:'Rejected', detail:'Some Error Occured.'}];
      }
  });
}

deleteStudent(){
  debugger
  this.isLoading = true;
  this.modifyStudentService
    .deleteStudentByID(this.createStudentForm.value._id)
    .pipe(
      finalize(() => {
        this.createStudentForm.markAsPristine();
        this.isLoading = false;
      })
    )
    .subscribe(
      (response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
        console.log(response);
        setTimeout(() => {
        this.router.navigate(['/dashboard/student/studentrecords'], {
          replaceUrl: true
        });
        }, 2000);
        this.isLoading = false;
      },
      (error: any) => {
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Some error occurs while deleting' });
        console.log(`delete error: ${error}`);
        this.isLoading = false;
      }
    );
}

onSendEmail(){
  debugger
  this.isLoading = true;
  this.emailForm.patchValue({
    email: this.createStudentForm.value.email,
    username: this.createStudentForm.value.firstName,
    //email : "shaheenmalik879@gmail.com",
    //email: "owaismalik049@gmail.com",
    //username: "Muhammad",
    subject: this.emailForm.value.subject,//"Pay Your Fee",
    message: "Hi " + this.createStudentForm.value.firstName + ',<p>' + this.emailForm.value.message + "</p>"
    //"Hi " + this.emailForm.value.firstName + ',' + "<p>Your fee is due. Please pay as soon as possible.</p>"
  })
  //this.emailForm.value.email = "owaismalik049@gmail.com";
  // this.emailForm.value.email = "owaismalik049@gmail.com";
  // this.email.email = "shaheenmalik879@gmail.com";
  
  this.modifyStudentService.sendEmail(this.emailForm.value)
    .pipe(
      finalize(() => {
        this.createStudentForm.markAsPristine();
        setTimeout(() => {
          this.isLoading = false;
          }, 1000);
      })
    )
    .subscribe(
      (response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Email Send Successfully' });
        console.log(response);
        setTimeout(() => {
        this.router.navigate(['/dashboard/student/studentrecords'], {
          replaceUrl: true
        });
        }, 1000);
      },
      (error: any) => {
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Some error occurs while sending email' });
        console.log(`delete error: ${error}`);
      }
    );
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
  this.isLoading = true;
  this.isPaid = true;
    this.submitted = false;
    this.createStudentForm.reset();
    this.i.reset();
    this.i.clear();
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Clear Successfully' });
  this.isLoading = false;
}

ngOnDestroy() {
  // unsubscribe to ensure no memory leaks
  this.subscription.unsubscribe();
  this.isLoading = false;
}

selectFile(event) {
  debugger
  this.uploadedFiles= [];
    this.selectedFiles = event.files[0];
    this.objCirriculumVitae = this.selectedFiles;
    var new_file = new File([this.selectedFiles], this.createStudentForm.value.regNo + this.selectedFiles.name);
    this.uploadedFiles.push(new_file);
  }

  onUpload(event,form,type: string) {
    debugger
    this.isLoading = true;
    this.uploadedFiles= [];
    this.selectedFiles = event.files[0];
    var new_file = new File([this.selectedFiles], '2716_'+ this.selectedFiles.name);
    this.uploadedFiles.push(new_file);
    this.currentFileUpload = new_file;
    this.modifyStudentService.pushFileToStorage(this.currentFileUpload).subscribe(
      (response: any) => {
        var fileName = response;
        if(type === 'cirriculumVitae'){
          this.attachmentPath.cirriculumVitae = fileName;
        } else if(type === 'transcript'){
          this.attachmentPath.transcript = fileName;
        } else if(type === 'courseCompletion'){
          this.attachmentPath.courseCompletion = fileName;
        } else if(type === 'offerLetter'){
          this.attachmentPath.offerLetter = fileName;
        } else if(type === 'enrollmentLetter'){
          this.attachmentPath.enrollmentLetter = fileName;
        } else if(type === 'withDrawalLetter'){
          this.attachmentPath.withDrawalLetter = fileName;
        } else if(type === 'otherLetter'){
          this.attachmentPath.otherLetter = fileName;
        } else if(type === 'feedbackForm'){
          this.attachmentPath.feedbackForm = fileName;
        } else if(type === 'warningLetter'){
          this.attachmentPath.warningLetter = fileName;
        }else if(type === 'previousQualification1'){
          this.attachmentPath.feedbackForm = fileName;
        } else if(type === 'previousQualification2'){
          this.attachmentPath.warningLetter = fileName;
        }
        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File Uploaded Successfully' });
        form.clear();
        this.isLoading = false;
        console.log(response);
      },
      (error: any) => {
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Some error occurs while uploading file' });
        console.log(`uploading error: ${error}`);
        this.isLoading = false;
      }
    );
  }

  onChangePaidDD(value: any){
    debugger
    if(value && value === "UnPaid"){
      this.isPaid = false;
    }else{
      this.isPaid = true;
    }
  }

  onChangeInstallmentDD(value: any){
    debugger
    this.i.clear();
     for (let index = 0; index < value; index++) {
      (this.createStudentForm.get("installments") as FormArray).push(this.installments);
     }
  }

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.modifyStudentService.getFiles();
    }
  }

}