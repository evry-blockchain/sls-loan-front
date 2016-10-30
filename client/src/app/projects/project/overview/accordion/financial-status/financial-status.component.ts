import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'overview-financial-status',
  templateUrl: './financial-status.component.html',
  styleUrls: ['./financial-status.component.scss']
})
export class OverviewFinancialStatusComponent implements OnInit {

  constructor() { }

    ngOnInit() { }


  public pieChartLabels:string[] = ['Skandiabanken', 'Dashmi', 'Aus Inc', 'DNB', 'SMN'];
  public pieChartData:number[] = [150, 300, 90, 100, 30];
  public pieChartType:string = 'pie';
  public barChartOptions = {
  scaleShowVerticalLines: false,
  responsive: true,
  maintainAspectRatio: false,
};

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
