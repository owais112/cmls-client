import { Routes } from '@angular/router';
import { AuthenticationGuard } from '../core';

import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { AssignRoleComponent } from './assign-role';
// import { AppMainComponent } from '.';

export const DashboardRoutes: Routes = [
  
    { 
        path: '', 
        canActivate: [AuthenticationGuard],
         component: DashboardComponent,
        // children: [
        //      { path: 'dashboard', component: DashboardComponent }
        // ]
      },
      { path: 'role/assignrole', component: AssignRoleComponent },
      {
        path: 'student',
        loadChildren: () => import('../dashboard/student/student.module').then(m => m.StudentModule)
      }
    ];