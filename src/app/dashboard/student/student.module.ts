import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StudentRecordsComponent } from './student-records/student-records.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentRoutes, ModifyStudentComponent } from '.';
import { RouterModule } from '@angular/router';
import { PrimePartsModule } from 'src/buildingblocks/primeParts.modules';
import { StudentService } from './service/student.service';
import { SharedService } from './service/shared.service';
import { SearchStudentComponent } from './search-student/search-student.component';
import { LeaveStudentComponent } from './leave-student/leave-student.component';
import { DetailUploadComponent } from './detail-upload/detail-upload.component';
import { SharedModule } from 'src/app/shared';


@NgModule({
  declarations: [StudentRecordsComponent, CreateStudentComponent, ModifyStudentComponent, SearchStudentComponent, LeaveStudentComponent, DetailUploadComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CommonModule,
    SharedModule,
    PrimePartsModule,
    RouterModule.forChild(StudentRoutes)
  ],
  providers: [
    StudentService,SharedService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class StudentModule { }
