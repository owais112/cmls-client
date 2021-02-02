import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
// import {APP_BASE_HREF} from '@angular/common';


import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { AppRoutes } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    CoreModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
  // providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppModule {}
