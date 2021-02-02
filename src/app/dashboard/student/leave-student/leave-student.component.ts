import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeNode, SelectItem, LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/core/service/babylon/breadcrumb.service';
import { style } from '@angular/animations';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/core';
import { finalize } from 'rxjs/operators';
import { SharedService } from '../service/shared.service';
import { QualificationTitleDD } from '../create-student/model/create-student.model';

@Component({
  selector: 'app-leave-student',
  templateUrl: './leave-student.component.html',
  styles: [`
        /* Table */
        .ui-table.ui-table-cars .ui-table-caption.ui-widget-header {
            padding: 12px;
            text-align: left;
            font-size: 20px;
            font-weight: normal;
        }

        .ui-table .ui-table-globalfilter-container {
            position: relative;
            top: -4px;
        }

        .ui-column-filter {
            margin-top: 1em;
        }

        .ui-column-filter .ui-multiselect-label {
            font-weight: 500;
        }

        .ui-table.ui-table-cars .ui-table-thead > tr > th {
            text-align: left;
        }

        .ui-table-globalfilter-container {
            float: right;
            display: inline;
        }

        .ui-table.ui-table-cars .ui-table-tbody .ui-column-title {
            font-size: 16px;
        }

        .ui-table.ui-table-cars .ui-paginator {
            padding: 1em;
        }

        /* DataView */
        .filter-container {
            text-align: center;
        }

        .car-details-list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2em;
            border-bottom: 1px solid #d9dad9;
        }

        .car-details-list > div {
            display: flex;
            align-items: center;
        }

        .car-details-list > div img {
            margin-right: 14px;
        }

        .car-detail {
            padding: 0 1em 1em 1em;
            border-bottom: 1px solid #d9dad9;
            margin: 1em;
        }

        .ui-panel-content {
            padding: 1em;
        }

        @media (max-width: 1024px) {
            .car-details-list img {
                width: 75px;
            }

            .filter-container {
                text-align: left;
            }
        }

        /* Carousel */
        .car-item {
            padding-top: 5px;
        }

        .car-item .ui-md-3 {
            text-align: center;
        }

        .car-item .ui-g-10 {
            font-weight: bold;
        }

        .empty-car-item-index {
            background-color: #f1f1f1;
            width: 60px;
            height: 60px;
            margin: 36px auto 0 auto;
            animation: pulse 1s infinite ease-in-out;
        }

        .empty-car-item-image {
            background-color: #f1f1f1;
            width: 120px;
            height: 120px;
            animation: pulse 1s infinite ease-in-out;
        }

        .empty-car-item-text {
            background-color: #f1f1f1;
            height: 18px;
            animation: pulse 1s infinite ease-in-out;
        }

        .title-container {
            padding: 1em;
            text-align: right;
        }

        .sort-container {
            text-align: left;
        }

        .ui-carousel .ui-carousel-content .ui-carousel-item .car-details > .p-grid {
            border: 1px solid #b3c2ca;
            border-radius: 3px;
            margin: 0.3em;
            text-align: center;
            padding: 2em 0 2.25em 0;
        }
        .ui-carousel .ui-carousel-content .ui-carousel-item .car-data .car-title {
            font-weight: 700;
            font-size: 20px;
            margin-top: 24px;
        }
        .ui-carousel .ui-carousel-content .ui-carousel-item .car-data .car-subtitle {
            margin: 0.25em 0 2em 0;
        }
        .ui-carousel .ui-carousel-content .ui-carousel-item .car-data button {
            margin-left: 0.5em;
        }
        .ui-carousel .ui-carousel-content .ui-carousel-item .car-data button:first-child {
            margin-left: 0;
        }
        .ui-carousel.custom-carousel .ui-carousel-dot-icon {
            width: 16px !important;
            height: 16px !important;
            border-radius: 50%;
        }
        .ui-carousel.ui-carousel-horizontal .ui-carousel-content .ui-carousel-item.ui-carousel-item-start .car-details > .p-grid {
            margin-left: 0.6em;
        }
        .ui-carousel.ui-carousel-horizontal .ui-carousel-content .ui-carousel-item.ui-carousel-item-end .car-details > .p-grid {
            margin-right: 0.6em;
        }

        @media (max-width: 40em) {
            .car-item {
                text-align: center;
            }
            .index-col {
                display: none;
            }
            .image-col {
                display: none;
            }
        }
        @keyframes pulse {
            0% {
                background-color: rgba(165, 165, 165, 0.1)
            }
            50% {
                background-color: rgba(165, 165, 165, 0.3)
            }
            100% {
                background-color: rgba(165, 165, 165, 0.1)
            }
        }
        @keyframes ui-progress-spinner-color {
            100%,
            0% {
                stroke: #d62d20;
            }
            40% {
                stroke: #0057e7;
            }
            66% {
                stroke: #008744;
            }
            80%,
            90% {
                stroke: #ffa700;
            }
        }
        
        .loader {
            margin-left: 40%;
            margin-top: 25em;
            position: fixed;
        } 
    `],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService]
})
export class LeaveStudentComponent implements OnInit {

  cols: any[];
  selectedRow: any;
  data: any[];
  isLoading = false;
  loading: boolean;
  isAdmin: boolean;

  qualificationTitleDD = QualificationTitleDD;

  constructor(private breadcrumbService: BreadcrumbService,
      private messageService: MessageService,
      public router: Router,
      private formBuilder: FormBuilder,
      private createStudentService: AuthenticationService, 
      private confirmationService: ConfirmationService,
      private sharedService: SharedService) {
      this.breadcrumbService.setItems([
          { label: 'Dashboard' },
          { label: 'Student Leave Records', routerLink: ['/dashboard/student-leave-records'] }
      ]);
  }

  ngOnInit() {
        this.isAdmin = this.createStudentService.credentials.user.role && this.createStudentService.credentials.user.role === 'admin' ? true : false;
      this.loading = true;
      this.cols = [
          { field: 'regNo', header: 'Registration No.' },
          { field: 'firstName', header: 'First Name' },
          { field: 'lastName', header: 'Last Name' },
          { field: 'qualificationTitle', header: 'Qualification Title' },
          { field: 'email', header: 'Email' },
          { field: 'phone', header: 'Phone' },
          { field: 'checkPaid', header: 'Paid' }
      ];
      
      this.getStudentRecords();
  }

  getStudentRecords(){
      debugger
      this.createStudentService.getAllStudents()
      .pipe(
          finalize(() => {
          this.isLoading = false;
          })
    )
    .subscribe(
      (response: any) => {
        this.data = response.filter(x=> x.isDeleted === true);
        setTimeout(() => {
            this.loading = false;
        }, 1000);
      },
      (error: any) => {
        console.log(`Login error: ${error}`);
        setTimeout(() => {
            this.loading = false;
        }, 500);
      }
    );
  }

  onModify(selectedRowData: any){
      debugger
      this.sharedService.sendMessage(selectedRowData);
      // this.clearMessages();
  }

  clearMessages(): void {
      // clear messages
      this.sharedService.clearMessages();
  }

  printReport() {
    let printContents, popupWin;
    printContents = document.getElementById("print-section").innerHTML;
    popupWin = window.open("", "_blank", 'height='+screen.height+', width='+screen.width);
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
        <style>
        .align-center{text-align:center}table{width:750px;border-collapse:collapse;margin:50px auto;text-align:center}th{font-weight:700}td,
        th{padding:10px;border:1px solid #c8c8c8;text-align:left;font-size:14px}@media only screen and (max-width:760px),(min-device-width:768px) 
        and (max-device-width:1024px){table{width:100%;text-align:center}table,tbody,td,th,thead,
        tr{display:block}thead tr{position:absolute;top:-9999px;left:-9999px}tr{border:1px solid #ccc}td{border:none;border-bottom:1px solid #eee;position:relative;
        padding-left:50%}td:before{position:absolute;top:6px;left:6px;width:45%;padding-right:10px;white-space:nowrap;content:attr(data-column);color:#000;font-weight:700}}
        </style>
        </head>
    <body onload='window.print();window.close()'>${printContents}</body>
      </html>`);
    popupWin.document.close();
  }

}