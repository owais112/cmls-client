import { Routes } from '@angular/router';

import { NotFoundComponent } from '../authentication/404/not-found.component';
import { LoginComponent } from '../authentication/login/login.component';
import { SignupComponent } from '../authentication/signup/signup.component';
import { ForgotComponent } from './forgot';
import { ResetComponent } from '.';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'forgot',
        component: ForgotComponent
      },
      {
        path: 'reset/:id',
        component: ResetComponent
      }
    ]
  }
];
