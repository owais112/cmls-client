import { Routes } from '@angular/router';

import { BlankComponent, AppMainComponent } from './shared';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {
     path: '',
     component: BlankComponent,
     children: [
      {
        path: '',
        loadChildren:
          () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];