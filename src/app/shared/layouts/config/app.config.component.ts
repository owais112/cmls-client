import {Component, OnInit} from '@angular/core';
import { AppMainComponent } from 'src/app/shared/layouts/main/main.component';

@Component({
    selector: 'app-config',
    template: `
        <div class="layout-config" [ngClass]="{'layout-config-active': app.configActive}" (click)="app.onConfigClick($event)">
            <div class="layout-config-content">
                <a style="cursor: pointer" id="layout-config-button" class="layout-config-button" (click)="onConfigButtonClick($event)">
                    <i class="pi pi-cog"></i>
                </a>
                <a style="cursor: pointer" class="layout-config-close" (click)="onConfigCloseClick($event)">
                    <i class="pi pi-times"></i>
                </a>
                <p-tabView>
                    <p-tabPanel header="Menu">
                        <h1>Menu Modes</h1>
                        <div class="p-grid">
                            <div class="p-col p-col-fixed">
                                <a style="cursor: pointer" class="layout-config-option-image" (click)="app.layoutMode = 'static'">
                                    <img src="assets/layout/images/configurator/menu/babylon-static.png" alt="babylon"/>
                                    <i class="pi pi-check" *ngIf="app.layoutMode === 'static'"></i>
                                </a>
                                <span>Static</span>
                            </div>
                            <div class="p-col p-col-fixed">
                                <a style="cursor: pointer" class="layout-config-option-image" (click)="app.layoutMode = 'overlay'">
                                    <img src="assets/layout/images/configurator/menu/babylon-overlay.png" alt="babylon"/>
                                    <i class="pi pi-check" *ngIf="app.layoutMode === 'overlay'"></i>
                                </a>
                                <span>Overlay</span>
                            </div>
                            <div class="p-col p-col-fixed">
                                <a style="cursor: pointer" class="layout-config-option-image" (click)="app.layoutMode = 'horizontal'">
                                    <img src="assets/layout/images/configurator/menu/babylon-horizontal.png" alt="babylon"/>
                                    <i class="pi pi-check" *ngIf="app.layoutMode === 'horizontal'"></i>
                                </a>
                                <span>Horizontal</span>
                            </div>
                            <div class="p-col p-col-fixed">
                                <a style="cursor: pointer" class="layout-config-option-image"
                                   (click)="app.layoutMode = 'slim'">
                                    <img src="assets/layout/images/configurator/menu/babylon-slim.png" alt="babylon"/>
                                    <i class="pi pi-check" *ngIf="app.layoutMode === 'slim'"></i>
                                </a>
                                <span>Slim</span>
                            </div>
                        </div>
                        <h1>Menu Type</h1>
                        <div class="p-grid">
                            <div class="p-col p-col-fixed">
                                <a style="cursor: pointer" class="layout-config-option-image" (click)="this.app.grouped = true">
                                    <img src="assets/layout/images/configurator/menu/babylon-grouped.png" alt="babylon"/>
                                    <i class="pi pi-check" *ngIf="app.grouped"></i>
                                </a>
                                <span>Grouped</span>
                            </div>
                            <div class="p-col p-col-fixed">
                                <a style="cursor: pointer" class="layout-config-option-image" (click)="this.app.grouped = false">
                                    <img src="assets/layout/images/configurator/menu/babylon-ungrouped.png" alt="babylon"/>
                                    <i class="pi pi-check" *ngIf="!app.grouped"></i>
                                </a>
                                <span>Ungrouped</span>
                            </div>
                        </div>
                        <h1>Menu Colors</h1>
                        <div class="p-grid">
                            <div class="p-col p-col-fixed">
                                <a style="cursor: pointer" class="layout-config-option-image" (click)="this.app.darkMenu = true">
                                    <img src="assets/layout/images/configurator/menu/babylon-static.png" alt="babylon"/>
                                    <i class="pi pi-check" *ngIf="app.darkMenu"></i>
                                </a>
                                <span>Dark</span>
                            </div>
                            <div class="p-col p-col-fixed">
                                <a style="cursor: pointer" class="layout-config-option-image" (click)="this.app.darkMenu = false">
                                    <img src="assets/layout/images/configurator/menu/babylon-light.png" alt="babylon"/>
                                    <i class="pi pi-check" *ngIf="!app.darkMenu"></i>
                                </a>
                                <span>Light</span>
                            </div>
                        </div>
                    </p-tabPanel>
                    <p-tabPanel header="User Profile">
                        <div class="p-grid">
                            <div class="p-col p-col-fixed">
                                <a style="cursor: pointer" [class]="app.isHorizontal() ? 'ui-state-disabled':''"
                                   (click)="onProfileModeClick('inline')">
                                    <img src="assets/layout/images/configurator/menu/babylon-inline.png" alt="babylon"/>
                                    <i class="pi pi-check" *ngIf="app.profileMode === 'inline' && !app.isHorizontal()"></i>
                                </a>
                                <span>Inline</span>
                            </div>
                            <div class="p-col p-col-fixed">
                                <a style="cursor: pointer" [class]="app.isHorizontal() ? 'ui-state-disabled':''"
                                   (click)="onProfileModeClick('popup')">
                                    <img src="assets/layout/images/configurator/menu/babylon-popup.png" alt="babylon"/>
                                    <i class="pi pi-check" *ngIf="app.profileMode === 'popup' || app.isHorizontal()"></i>
                                </a>
                                <span>Popup</span>
                            </div>
                        </div>
                    </p-tabPanel>
                    <p-tabPanel header="Themes">
                        <div class="p-grid">
                            <div class="p-col p-xl-2" *ngFor="let componentTheme of componentThemes">
                                <a style="cursor: pointer" class="layout-config-option-image layout-config-option"
                                   (click)="changeTheme(componentTheme.name,componentTheme.file)">
                                    <img src="assets/layout/images/configurator/themes/{{componentTheme.image}}" alt="babylon"/>
                                    <i class="pi pi-check" *ngIf="themeColor === componentTheme.name + '-' + componentTheme.file"></i>
                                </a>
                            </div>
                        </div>
                    </p-tabPanel>
                </p-tabView>
            </div>
        </div>
    `
})
export class AppConfigComponent implements OnInit {

    componentThemes: any;

    themeColor = 'blue-accent';

    constructor(public app: AppMainComponent) {}

    ngOnInit() {
        this.componentThemes = [
            {name: 'amber', file: 'accent', image: 'amber-accent.svg'},
            {name: 'amber', file: 'light', image: 'amber-light.svg'},
            {name: 'amber', file: 'dark', image: 'amber-dark.svg'},
            {name: 'blue', file: 'accent', image: 'blue-accent.svg'},
            {name: 'blue', file: 'light', image: 'blue-light.svg'},
            {name: 'blue', file: 'dark', image: 'blue-dark.svg'},
            {name: 'bluegrey', file: 'accent', image: 'bluegrey-accent.svg'},
            {name: 'bluegrey', file: 'light', image: 'bluegrey-light.svg'},
            {name: 'bluegrey', file: 'dark', image: 'bluegrey-dark.svg'},
            {name: 'brown', file: 'accent', image: 'brown-accent.svg'},
            {name: 'brown', file: 'light', image: 'brown-light.svg'},
            {name: 'brown', file: 'dark', image: 'brown-dark.svg'},
            {name: 'cyan', file: 'accent', image: 'cyan-accent.svg'},
            {name: 'cyan', file: 'light', image: 'cyan-light.svg'},
            {name: 'cyan', file: 'dark', image: 'cyan-dark.svg'},
            {name: 'deeporange', file: 'accent', image: 'deeporange-accent.svg'},
            {name: 'deeporange', file: 'light', image: 'deeporange-light.svg'},
            {name: 'deeporange', file: 'dark', image: 'deeporange-dark.svg'},
            {name: 'deeppurple', file: 'accent', image: 'deeppurple-accent.svg'},
            {name: 'deeppurple', file: 'light', image: 'deeppurple-light.svg'},
            {name: 'deeppurple', file: 'dark', image: 'deeppurple-dark.svg'},
            {name: 'green', file: 'accent', image: 'green-accent.svg'},
            {name: 'green', file: 'light', image: 'green-light.svg'},
            {name: 'green', file: 'dark', image: 'green-dark.svg'},
            {name: 'indigo', file: 'accent', image: 'indigo-accent.svg'},
            {name: 'indigo', file: 'light', image: 'indigo-light.svg'},
            {name: 'indigo', file: 'dark', image: 'indigo-dark.svg'},
            {name: 'lightblue', file: 'accent', image: 'lightblue-accent.svg'},
            {name: 'lightblue', file: 'light', image: 'lightblue-light.svg'},
            {name: 'lightblue', file: 'dark', image: 'lightblue-dark.svg'},
            {name: 'lightgreen', file: 'accent', image: 'lightgreen-accent.svg'},
            {name: 'lightgreen', file: 'light', image: 'lightgreen-light.svg'},
            {name: 'lightgreen', file: 'dark', image: 'lightgreen-dark.svg'},
            {name: 'lime', file: 'accent', image: 'lime-accent.svg'},
            {name: 'lime', file: 'light', image: 'lime-light.svg'},
            {name: 'lime', file: 'dark', image: 'lime-dark.svg'},
            {name: 'orange', file: 'accent', image: 'orange-accent.svg'},
            {name: 'orange', file: 'light', image: 'orange-light.svg'},
            {name: 'orange', file: 'dark', image: 'orange-dark.svg'},
            {name: 'pink', file: 'accent', image: 'pink-accent.svg'},
            {name: 'pink', file: 'light', image: 'pink-light.svg'},
            {name: 'pink', file: 'dark', image: 'pink-dark.svg'},
            {name: 'purple', file: 'accent', image: 'purple-accent.svg'},
            {name: 'purple', file: 'light', image: 'purple-light.svg'},
            {name: 'purple', file: 'dark', image: 'purple-dark.svg'},
            {name: 'teal', file: 'accent', image: 'teal-accent.svg'},
            {name: 'teal', file: 'light', image: 'teal-light.svg'},
            {name: 'teal', file: 'dark', image: 'teal-dark.svg'},
            {name: 'yellow', file: 'accent', image: 'yellow-accent.svg'},
            {name: 'yellow', file: 'light', image: 'yellow-light.svg'},
            {name: 'yellow', file: 'dark', image: 'yellow-dark.svg'}
        ];
    }

    onProfileModeClick(mode: string) {
        if (this.app.isHorizontal()) {
            return;
        }

        this.app.profileMode = mode;
    }

    changeTheme(theme: string, scheme: string) {
        this.changeStyleSheetsColor('theme-css', theme, 'theme-' + scheme + '.css');
        this.changeStyleSheetsColor('layout-css', theme, 'layout-' + theme + '.css');
        this.themeColor = theme + '-' + scheme;

        const topbarLogo: HTMLImageElement = document.getElementById('layout-topbar-logo') as HTMLImageElement;
        const menuLogo: HTMLImageElement = document.getElementById('layout-menu-logo') as HTMLImageElement;

        if (theme === 'yellow' || theme === 'lime') {
            topbarLogo.src = 'assets/layout/images/sms-logo.png';
            menuLogo.src = 'assets/layout/images/sms-logo.png';
        } else {
            topbarLogo.src = 'assets/layout/images/sms-logo.png';
            menuLogo.src = 'assets/layout/images/sms-logo.png';
        }
    }

    changeStyleSheetsColor(id, color, value) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute('href').split('/');

        if (id.localeCompare('layout-css') === 0) {
            urlTokens[urlTokens.length - 1] = value;
        } else {
            urlTokens[urlTokens.length - 2] = color ;
            urlTokens[urlTokens.length - 1] = value ;
        }
        const newURL = urlTokens.join('/');

        this.replaceLink(element, newURL);
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    onConfigButtonClick(event) {
        this.app.configActive = !this.app.configActive;
        event.preventDefault();
    }

    onConfigCloseClick(event) {
        this.app.configActive = false;
        event.preventDefault();
    }
}
