import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from '../authentication/404/not-found.component';
import { AuthenticationRoutes } from '../authentication/authentication.routing';
import { LoginComponent } from '../authentication/login/login.component';
import { SignupComponent } from '../authentication/signup/signup.component';
import { SharedModule } from '../shared';
import { ForgotComponent, ResetComponent } from '.';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(AuthenticationRoutes)
  ],
  declarations: [NotFoundComponent, SignupComponent, LoginComponent,ForgotComponent, ResetComponent]
})
export class AuthenticationModule {}
