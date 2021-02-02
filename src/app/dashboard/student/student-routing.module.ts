import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentRecordsComponent, CreateStudentComponent, ModifyStudentComponent, SearchStudentComponent, LeaveStudentComponent, DetailUploadComponent } from '.';
import { DashboardComponent } from '..';
import { AuthenticationGuard } from 'src/app/core';


export const StudentRoutes: Routes = [
  { 
    canActivate: [AuthenticationGuard],    
    path: 'student', 
    //  component: DashboardComponent,
        children: [
          {path: 'studentrecords', component: StudentRecordsComponent},
          {path: 'createstudent', component: CreateStudentComponent},
          {path: 'modifystudent', component: ModifyStudentComponent},
          {path: 'searchstudent', component: SearchStudentComponent},
          {path: 'leavestudent', component: LeaveStudentComponent},
          {path: 'detailsupload', component: DetailUploadComponent}
        ]
      }
    ];
