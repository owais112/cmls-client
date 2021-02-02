import {Component} from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';
import { AppMainComponent } from '..';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core';

@Component({
    selector: 'app-inline-profile',
    templateUrl: './app.profile.component.html',
    animations: [
        trigger('menu', [
            state('hiddenAnimated', style({
                height: '0px',
                paddingBottom: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                height: '*',
                'z-index': 100
            })),
            state('hidden', style({
                height: '0px',
                'z-index': '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppProfileComponent {

    active: boolean;

    constructor(public app: AppMainComponent,public router: Router,private createStudentService: AuthenticationService) { }

    onClick(event) {
        this.app.onInlineMenuClick(event);
        event.preventDefault();
    }

    logOut(){
        debugger
        this.createStudentService.logout();
        this.router.navigate(['/login']);
      }
}
