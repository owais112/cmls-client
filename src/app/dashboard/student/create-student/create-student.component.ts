import { Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { SelectItem, MenuItem, TreeNode, ConfirmationService } from 'primeng/primeng';
import { BreadcrumbService } from 'src/app/core/service/babylon/breadcrumb.service';
import { MessageService, Message } from 'primeng/api';
import { AuthenticationService } from 'src/app/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AttachmentPath } from '../modify-student/model/modify-student.model';
import { QualificationTitleDD } from './model/create-student.model';
// import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CreateStudentComponent implements OnInit,OnDestroy {

  bTitleDD: any[] = [];
  checkPaidDD: any[] = [];
  installmentDD: any[] = [];
  uploadedFiles: any[] = [];
  msgs: Message[] = [];
  isAdmin: boolean;

  createStudentForm: FormGroup;
  isLoading = false;
  submitted = false;
  newRegNo: string;
  isPaid: boolean = true;

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
    public router: Router,
    private formBuilder: FormBuilder,
    private createStudentService: AuthenticationService,
    private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Create Student', routerLink: ['/dashboard/create-student'] }
    ]);
    this.attachmentPath = new AttachmentPath();
    this.createForm();
  }

  get f() { return this.createStudentForm.controls; }
  get i() { return this.f.installments as FormArray; }

  ngOnInit() {
    this.isAdmin = this.createStudentService.credentials.user.role && this.createStudentService.credentials.user.role === 'admin' ? true : false;
    if(!this.isAdmin){
      this.msgs = [{severity:'warn', summary:'Warning', detail:'You are not authorized user.'}];
      return;
    }
    this.isLoading = true;
    this.getAllRecords();
    this.bTitleDD = [];
    this.bTitleDD.push({ label: 'Mr.', value: 'Mr.' });
    this.bTitleDD.push({ label: 'Miss', value: 'Miss' });

    this.checkPaidDD = [];
    this.checkPaidDD.push({ label: 'Paid', value: 'Paid' });
    this.checkPaidDD.push({ label: 'UnPaid', value: 'UnPaid' });

    this.installmentDD = [];
    this.installmentDD.push({ label: '1', value: '1' });
    this.installmentDD.push({ label: '2', value: '2' });
    this.installmentDD.push({ label: '3', value: '3' });
    this.installmentDD.push({ label: '4', value: '4' });
    this.installmentDD.push({ label: '5', value: '5' });
    this.installmentDD.push({ label: '6', value: '6' });
    this.installmentDD.push({ label: '7', value: '7' });
    this.installmentDD.push({ label: '8', value: '8' });
    this.installmentDD.push({ label: '9', value: '9' });
    this.installmentDD.push({ label: '10', value: '10' });

  }

  onSaveStudent() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to save?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.createStudent();
        // this.msgs = [{severity:'info', summary:'Confirmed', detail:'Saved Successfully.'}];
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'Some Error Occured.'}];
      }
    });
  }

  private createForm() {
    this.createStudentForm = this.formBuilder.group({
      regNo: ['', [Validators.required]],
      satelliteCenter: ['', [Validators.required]],
      titleName: ['Mr.', [Validators.required]],
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
      qStartDate: [, [Validators.required]],
      qExpectedDate: ['', [Validators.required]],
      qActualDate: ['', [Validators.required]],
      totalFee: [null, [Validators.required]],
      feeOffered: [null, [Validators.required]],
      checkPaid: ['Paid', [Validators.required]],
      fPaidDate: ['', [Validators.required]],
      installment: [null, [Validators.required]],
      createdBy: ['', [Validators.required]],
      modifiedBy: ['', [Validators.required]],
      isDeleted: [false, [Validators.required]],
      installments: this.formBuilder.array([this.installments]),
      attachmentPath: [null,[Validators.required]],
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

  createStudent() {
    debugger
    this.isLoading = true;
    // if(!(this.attachmentPath && (this.attachmentPath.cirriculumVitae || this.attachmentPath.courseCompletion || this.attachmentPath.enrollmentLetter ||
    //   this.attachmentPath.feedbackForm || this.attachmentPath.offerLetter || this.attachmentPath.otherLetter 
    //   || this.attachmentPath.transcript || this.attachmentPath.warningLetter || this.attachmentPath.withDrawalLetter))){
    //   this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Attachments are missing.' });
    //   this.isLoading = false;
    //   return;
    // }
    this.createStudentForm.patchValue({
      regNo: (this.newRegNo || this.createStudentForm.value.regNo) ? this.newRegNo : 1001,
      createdBy: 'Admin',
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
      this.isLoading = false;
    return;
    }
    if (this.createStudentForm.valid) {

      this.isLoading = true;
      this.createStudentService.createStudent(this.createStudentForm.value)
        .pipe(
          finalize(() => {
            this.createStudentForm.markAsPristine();
            setTimeout(() => {
              this.isLoading = false;
              }, 500);
          })
        )
        .subscribe(
          (response: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Create Successfully' });
            console.log(response);
            setTimeout(() => {
              this.router.navigate(['/dashboard/student/studentrecords'], {
                replaceUrl: true
              });
            }, 500);
          },
          (error: any) => {
            if(error.error.errors.msg === 'STUDENT_EMAIL_ALREADY_EXISTS' || error.error.errors.msg.includes('duplicate key error collection')){
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
        }, 500);
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
    this.isPaid = true;
    this.submitted = false;
    this.createStudentForm.reset();
    this.i.reset();
    this.i.clear();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Clear Successfully' });
  }

  ngOnDestroy() {
    this.isLoading = false;
  }

  getAllRecords() {
    debugger
    this.isLoading = true;
    this.createStudentService.getAllStudents()
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.isLoading = false;
            }, 500);
        })
      )
      .subscribe(
        (response: any) => {
          var length = response.length;
          if (length) {
            this.newRegNo = (Number(response[length - 1].regNo) + 1).toString();
            this.createStudentForm.patchValue({
              regNo: this.newRegNo
            });
          }
        },
        (error: any) => {
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
      this.createStudentService.pushFileToStorage(this.currentFileUpload).subscribe(
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
          form.clear();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File Uploaded Successfully' });
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
  

}