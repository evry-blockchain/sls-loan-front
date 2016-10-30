import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'overview-financial-status',
  templateUrl: './financial-status.component.html',
  styleUrls: ['./financial-status.component.scss']
})
export class OverviewFinancialStatusComponent implements OnInit {

  constructor() { }

    ngOnInit() { }


  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
