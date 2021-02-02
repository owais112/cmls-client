import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Car } from 'src/app/core/model/domain/car';
import { CarService } from 'src/app/core/service/babylon/carservice';
import { EventService } from 'src/app/core/service/babylon/eventservice';
import { BreadcrumbService } from 'src/app/core/service/babylon/breadcrumb.service';
import { AuthenticationService } from 'src/app/core';
import { finalize } from 'rxjs/operators';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  isLoading = false;
  barData: any;
  totalStudents: number;
  paidAmount: number;
  paidAmountPercent: string;
  unPaidAmount: number;
  unPaidAmountPercent: string;
  totalStudentsPercent: string;
  graphDataActual : any;

  chartOptions: any;

  fullCalendarOptions: any;

  constructor( private breadcrumbService: BreadcrumbService,
    private createStudentService: AuthenticationService, ) {
      this.breadcrumbService.setItems([
          { label: 'Dashboard', routerLink: [''] }
      ]);
      this.getAllRecords();
  }

  ngOnInit() {
      this.isLoading = true;
      

      this.chartOptions = {
          responsive: true,
          hover: {
              mode: 'index'
          },
          scales: {
              xAxes: [{
                  display: true,
                  scaleLabel: {
                      display: true,
                      labelString: 'Month'
                  }
              }],
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    max: 100,// Your absolute max value
                    callback: function (value) {
                      return (value / this.max * 100).toFixed(0) + '%'; // convert it to percentage
                    },
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Percentage',
                  },
                },
              ],
          }
      };
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
  }

  getAllRecords(){
    this.isLoading = true;
    this.createStudentService.getAllStudents()
    .pipe(
        finalize(() => {
        setTimeout(() => {
            this.isLoading = false;
        }, 500);
        })
  )
  .subscribe(
    (response: any) => {
        if(response && response.length > 0){
            var data = response;
            if(data && data.length > 0){
                this.totalStudents = data.length;
                this.totalStudentsPercent = this.totalStudents.toString() + '%';
                var isPaid = data.filter(x=> x.checkPaid === 'Paid');
                var isUnPaid = data.filter(x=> x.checkPaid === 'UnPaid');
                if(isPaid && isPaid.length > 0){
                    var paidPerc = isPaid.length;
                    this.paidAmountPercent = paidPerc.toString() + '%';
                    this.paidAmount = this.sum(isPaid, 'feeOffered');
                }
                if(isUnPaid && isUnPaid.length > 0){
                    var unPaidPerc = isUnPaid.length;
                    this.unPaidAmountPercent = unPaidPerc.toString() + '%';
                    this.unPaidAmount = this.sum(isUnPaid, 'feeOffered');
                }
                if(data && data.length > 0){
                    debugger
                    var graphDataStudent = {};
                    var graphDataAmount = [];
                    var graphData = {};
                    graphData['June'] = graphData['July'] = graphData['August'] = graphData['September'] = graphData['October'] = graphData['November'] = graphData['December'] = 0;
                    graphDataAmount['June'] = graphDataAmount['July'] = graphDataAmount['August'] = graphDataAmount['September'] = graphDataAmount['October'] = graphDataAmount['November'] = graphDataAmount['December'] = 0;
                    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
                    for (let index = 0; index < data.length; index++) {
                        data[index].qStartDate = new Date(data[index].qStartDate);
                        graphDataStudent['monthsData'] = monthNames[data[index].qStartDate.getMonth()];
                        if(graphDataStudent['monthsData'] === 'June'){
                            graphData['June'] = graphData['June'] + 1;
                            graphDataAmount['June'] = 0;
                            for (let index2 = 0; index2 < isPaid.length; index2++) {
                                var paideDate = new Date(isPaid[index2].qStartDate);
                                var getMonth = monthNames[paideDate.getMonth()];
                                graphDataStudent['fee'] = isPaid[index2].feeOffered;
                                if(getMonth === 'June'){
                                    graphDataAmount['June'] = (graphDataStudent['fee']) + graphDataAmount['June'];
                                }
                            }
                        }
                        else if(graphDataStudent['monthsData'] === 'July'){
                            graphData['July'] = graphData['July'] + 1;
                            graphDataAmount['July'] = 0;
                            for (let index2 = 0; index2 < isPaid.length; index2++) {
                                var paideDate = new Date(isPaid[index2].qStartDate);
                                var getMonth = monthNames[paideDate.getMonth()];
                                graphDataStudent['fee'] = isPaid[index2].feeOffered;
                                if(getMonth === 'July'){
                                    graphDataAmount['July'] = (graphDataStudent['fee']) + graphDataAmount['July'];
                                }
                            }
                        }
                        else if(graphDataStudent['monthsData'] === 'August'){
                            graphData['August'] = graphData['August'] + 1;
                            graphDataAmount['August'] = 0;
                            for (let index2 = 0; index2 < isPaid.length; index2++) {
                                var getMonth = monthNames[isPaid[index2].qStartDate.getMonth()];
                                graphDataStudent['fee'] = isPaid[index2].feeOffered;
                                if(getMonth === 'August'){
                                    graphDataAmount['August'] = (graphDataStudent['fee']) + graphDataAmount['August'];
                                }
                            }
                        }
                        else if(graphDataStudent['monthsData'] === 'September'){
                            graphDataAmount['September'] = 0;
                            graphData['September'] = graphData['September'] + 1;
                            for (let index2 = 0; index2 < isPaid.length; index2++) {
                                var paideDate = new Date(isPaid[index2].qStartDate);
                                var getMonth = monthNames[paideDate.getMonth()];
                                graphDataStudent['fee'] = isPaid[index2].feeOffered;
                                if(getMonth === 'September'){
                                    graphDataAmount['September'] = (graphDataStudent['fee']) + graphDataAmount['September'];
                                }
                            }
                        }
                        else if(graphDataStudent['monthsData'] === 'October'){
                            graphData['October'] = graphData['October'] + 1;
                            graphDataAmount['October'] = 0;
                            for (let index2 = 0; index2 < isPaid.length; index2++) {
                                var paideDate = new Date(isPaid[index2].qStartDate);
                                var getMonth = monthNames[paideDate.getMonth()];
                                graphDataStudent['fee'] = isPaid[index2].feeOffered;
                                if(getMonth === 'October'){
                                    graphDataAmount['October'] = (graphDataStudent['fee']) + graphDataAmount['October'];
                                }
                            }
                        }
                        else if(graphDataStudent['monthsData'] === 'November'){
                            graphData['November'] = graphData['November'] + 1;
                            graphDataAmount['November'] = 0;
                            for (let index2 = 0; index2 < isPaid.length; index2++) {
                                var paideDate = new Date(isPaid[index2].qStartDate);
                                var getMonth = monthNames[paideDate.getMonth()];
                                graphDataStudent['fee'] = isPaid[index2].feeOffered;
                                if(getMonth === 'November'){
                                    graphDataAmount['November'] = (graphDataStudent['fee']) + graphDataAmount['November'];
                                }
                            }
                        }
                        else if(graphDataStudent['monthsData'] === 'December'){
                            graphData['December'] = graphData['December'] + 1;
                            graphDataAmount['December'] = 0;
                            for (let index2 = 0; index2 < isPaid.length; index2++) {
                                var paideDate = new Date(isPaid[index2].qStartDate);
                                var getMonth = monthNames[paideDate.getMonth()];
                                graphDataStudent['fee'] = isPaid[index2].feeOffered;
                                if(getMonth === 'December'){
                                    graphDataAmount['December'] = (graphDataStudent['fee']) + graphDataAmount['December'];
                                }
                            }
                        }

                    }
                    if(graphData['June']){
                        graphData['June'] = this.percentage(graphData['June'],this.totalStudents).toFixed(2);
                        graphDataAmount['June'] = this.percentage(graphDataAmount['June'],this.paidAmount).toFixed(2);
                    }
                    if(graphData['July']){
                        graphData['July'] = this.percentage(graphData['July'],this.totalStudents).toFixed(2);
                        graphDataAmount['July'] = this.percentage(graphDataAmount['July'],this.paidAmount).toFixed(2);
                    }
                    if(graphData['August']){
                        graphData['August'] = this.percentage(graphData['August'],this.totalStudents).toFixed(2);
                        graphDataAmount['August'] = this.percentage(graphDataAmount['August'],this.paidAmount).toFixed(2);
                    }
                    if(graphData['September']){
                        graphData['September'] = this.percentage(graphData['September'],this.totalStudents).toFixed(2);
                        graphDataAmount['September'] = this.percentage(graphDataAmount['September'],this.paidAmount).toFixed(2);
                    }
                    if(graphData['October']){
                        graphData['October'] = this.percentage(graphData['October'],this.totalStudents).toFixed(2);
                        graphDataAmount['October'] = this.percentage(graphDataAmount['October'],this.paidAmount).toFixed(2);
                    }
                    if(graphData['November']){
                        graphData['November'] = this.percentage(graphData['November'],this.totalStudents).toFixed(2);
                        graphDataAmount['November'] = this.percentage(graphDataAmount['November'],this.paidAmount).toFixed(2);
                    }
                    if(graphData['December']){
                        graphData['December'] = this.percentage(graphData['December'],this.totalStudents).toFixed(2);
                        graphDataAmount['December'] = this.percentage(graphDataAmount['December'],this.paidAmount).toFixed(2);
                    }
                    this.barData = {
                        labels: ['June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        datasets: [
                            {
                                label: 'Students',
                                backgroundColor: '#2196F3',
                                borderColor: '#2196F3',
                                data: [graphData['June'], graphData['July'], graphData['August'], graphData['September'], graphData['October'], graphData['November'], graphData['December']]
                            },
                            {
                                label: 'Earning',
                                backgroundColor: '#FFC107',
                                borderColor: '#FFC107',
                                data: [graphDataAmount['June'], graphDataAmount['July'], graphDataAmount['August'], graphDataAmount['September'], graphDataAmount['October'], graphDataAmount['November'], graphDataAmount['December']]
                            }
                        ]
                    };
                }

            }
        }
    },
    (error: any) => {
      console.log(`Login error: ${error}`);
    }
  );
}

sum = function(items, prop){
    return items.reduce( function(a, b){
        return a + b[prop];
    }, 0);
};

percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
 } 

//  percentage(percent, total) {
//     return ((percent/ 100) * total).toFixed(2)
//}
}
