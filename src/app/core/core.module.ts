import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { AuthenticationGuard, AuthenticationService } from '../core/authentication';
import { ApiPrefixInterceptor, ErrorHandlerInterceptor, HttpService } from '../core/http';
import { LocalStorageService } from '../core/local-storage.service';
import { RouteReusableStrategy } from '../core/route-reusable-strategy';
import { ErrorMessageService, UserService, UtilService } from '../core/service';
import { CarService } from './service/babylon/carservice';
import { CountryService } from './service/babylon/countryservice';
import { EventService } from './service/babylon/eventservice';
import { NodeService } from './service/babylon/nodeservice';
import { BreadcrumbService } from './service/babylon/breadcrumb.service';
import { MenuService } from './service/babylon/app.menu.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule],
  declarations: [],
  providers: [
    LocalStorageService,
    AuthenticationService,
    AuthenticationGuard,
    ApiPrefixInterceptor,
    ErrorHandlerInterceptor,
    UserService,
    UtilService,
    ErrorMessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    CarService, CountryService, EventService, NodeService, BreadcrumbService, MenuService
  ]
})
export class CoreModule { }
