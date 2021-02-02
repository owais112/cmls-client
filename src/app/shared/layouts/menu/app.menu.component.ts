import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from 'src/app/shared';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of (app.grouped ? modelGrouped : modelUngrouped); let i = index;"
                [item]="item" [index]="i" [visible]="true" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {
    isAdmin: boolean;
    modelGrouped: any[];

    modelUngrouped: any[];

    constructor(public app: AppMainComponent) { }

    ngOnInit() {
        this.modelGrouped = [
            { label: 'Home Page', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}
                ]
            },
            {
                label: 'Features', icon: 'pi pi-fw pi-star', routerLink: ['/dashboard'],
                items: [
                    { label: 'All Student', icon: 'pi pi-fw pi-th-large', routerLink: ['/dashboard/student/studentrecords']  },
                    // { label: 'Forms', icon: 'pi pi-fw pi-file', routerLink: ['/components/forms'] },
                    // { label: 'Data', icon: 'pi pi-fw pi-table', routerLink: ['/dashboard/data'] },
                    // { label: 'Panels', icon: 'pi pi-fw pi-list', routerLink: ['/components/panels'] },
                    // { label: 'Overlays', icon: 'pi pi-fw pi-clone', routerLink: ['/components/overlays'] },
                    { label: 'Add Student', icon: 'pi pi-fw pi-plus', routerLink: ['/dashboard/student/createstudent'] },
                    { label: 'Leave Student', icon: 'pi pi-fw pi-spinner', routerLink: ['/dashboard/student/leavestudent'] },
                    // { label: 'Messages', icon: 'pi pi-fw pi-spinner', routerLink: ['/components/messages'] },
                    // { label: 'Charts', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/dashboard/student/createstudent'] },
                    // { label: 'Reports', icon: 'pi pi-fw pi-upload', routerLink: ['/dashboard/student/createstudent'] },
                    // { label: 'Misc', icon: 'pi pi-fw pi-briefcase', routerLink: ['/components/misc'] }
                ]
            },
            {
                label: 'Roles', icon: 'pi pi-fw pi-copy', routerLink: ['/dashboard'],
                items: [
                    { label: 'Assign Roles', icon: 'pi pi-fw pi-clone', routerLink: ['/dashboard/role/assignrole'] },
                    // { label: 'Invoice', icon: 'pi pi-fw pi-compass', routerLink: ['/pages/invoice'] },
                    // { label: 'Help Page', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/help'] },
                    // { label: 'Wizard', icon: 'pi pi-fw pi-star', routerLink: ['/wizard'] },
                    // { label: 'Landing Page', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
                    // { label: 'Login Page', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login'], target: '_blank' },
                    // { label: 'Error Page', icon: 'pi pi-fw pi-exclamation-triangle', routerLink: ['/error'], target: '_blank' },
                    // { label: '404 Page', icon: 'pi pi-fw pi-times', routerLink: ['/404'], target: '_blank' },
                    // {
                    //     label: 'Access Denied', icon: 'pi pi-fw pi-ban',
                    //     routerLink: ['/accessdenied'], target: '_blank'
                    // }
                ]
            },
            // {
            //     label: 'Hierarchy', icon: 'pi pi-fw pi-sitemap',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-sign-in',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-sign-in' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-sign-in' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-sign-in' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-sign-in' },
            //                         { label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-sign-in' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-sign-in',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-sign-in' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-sign-in' },
            //                         { label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-sign-in' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-sign-in' },
            //                         { label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-sign-in' }
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // { label: 'Get Started', icon: 'pi pi-fw pi-download',
            //     items: [
            //         {
            //             label: 'Documentation', icon: 'pi pi-fw pi-file', routerLink: ['/documentation']
            //         },
            //         {
            //             label: 'Buy Now', icon: 'pi pi-fw pi-money-bill', url: ['https://www.primefaces.org/store']
            //         }
            //     ]
            // }
        ];

        this.modelUngrouped = [
            {
                label: 'Main Menu',
                icon: 'pi pi-fw pi-home',
                items: this.modelGrouped
            }
        ];
    }
}
