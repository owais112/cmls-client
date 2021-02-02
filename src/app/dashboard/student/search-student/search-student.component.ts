import {Component, OnInit, ViewEncapsulation, Input, OnDestroy} from '@angular/core';
import { SelectItem, MenuItem, TreeNode, ConfirmationService } from 'primeng/primeng';
import { BreadcrumbService } from 'src/app/core/service/babylon/breadcrumb.service';
import { MessageService, Message } from 'primeng/api';
import { AuthenticationService } from 'src/app/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { SharedService } from '../service/shared.service';
import { AttachmentPath, Email } from '../modify-student/model/modify-student.model';
import { QualificationTitleDD } from '../create-student/model/create-student.model';

@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class SearchStudentComponent implements OnInit,OnDestroy {

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
      public router: Router,
      private formBuilder: FormBuilder,
      private modifyStudentService: AuthenticationService, 
      private confirmationService: ConfirmationService,
      private sharedService: SharedService) {
        debugger
        this.isLoading = true;
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
            setTimeout(() => {
              this.isLoading = false;
              }, 1000);
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
      this.bTitleDD.push({ label: 'Select Title', value: '' });
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
    this.createStudentForm.disable();
    this.emailForm.disable();
    this.createStudentForm.get('installments').disable();
}

get installments(): FormGroup {
  return this.formBuilder.group({
    iamount: [null],
    iPaidDate: [''],
    iCheckPaid:[null],
  });
}

ngOnDestroy() {
  // unsubscribe to ensure no memory leaks
  this.subscription.unsubscribe();
  this.isLoading = false;
}

}