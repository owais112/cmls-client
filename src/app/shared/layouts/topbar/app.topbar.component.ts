import { Component } from '@angular/core';
import { AppMainComponent } from '..';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    constructor(public app: AppMainComponent,public router: Router,private createStudentService: AuthenticationService) {}

    logOut(){
      debugger
      this.createStudentService.logout();
      this.router.navigate(['/login']);
    }
}
