import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DashboardRoutes } from '../dashboard/dashboard.routing';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { SharedModule } from '../shared';
import { StudentModule } from './student';
import { AssignRoleComponent } from './assign-role/assign-role.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    StudentModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [
    DashboardComponent,
    AssignRoleComponent,
  ],
  exports: [
    DashboardComponent,
    AssignRoleComponent,
    ReactiveFormsModule
  ]
})
export class DashboardModule {}
