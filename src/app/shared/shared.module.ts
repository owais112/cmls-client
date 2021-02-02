import { CommonModule } from '@angular/common';
import { NgModule  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';
import { BlankComponent } from '../shared/layouts/blank/blank.component';
import { AppMainComponent } from './layouts/main/main.component';
import { SpinnerComponent } from '../shared/spinner.component';
import { ButtonLoaderComponent } from '../shared/button-loader';
import { FormErrorWrapperComponent } from '../shared/form-error-wrapper/form-error-wrapper.component';
import { PrimePartsModule } from 'src/buildingblocks/primeParts.modules';
import { AppConfigComponent, AppMenuComponent, AppMenuitemComponent, AppProfileComponent, AppTopBarComponent, AppFooterComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PrimePartsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SpinnerComponent,
    BreadcrumbComponent,
    BlankComponent,
    AppMainComponent,
    ButtonLoaderComponent,
    FormErrorWrapperComponent,
    AppConfigComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppProfileComponent,
    AppTopBarComponent,
    AppFooterComponent
  ],
  exports: [
    SpinnerComponent,
    BreadcrumbComponent,
    BlankComponent,
    AppMainComponent,
    ButtonLoaderComponent,
    FormErrorWrapperComponent,
    AppConfigComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppProfileComponent,
    AppTopBarComponent,
    AppFooterComponent,
    PrimePartsModule,
  ],
  entryComponents: [],
  providers: []
})
export class SharedModule {}
