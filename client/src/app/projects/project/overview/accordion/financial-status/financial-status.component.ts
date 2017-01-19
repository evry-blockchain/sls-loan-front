import {Component, OnInit} from '@angular/core';
import {ParticipantService} from "../../../../../participants/service/participants.service";
import {ProjectNegotiationService} from "../../../service/project-negotiation.service";
import {Observable} from "rxjs";

@Component({
  selector: 'overview-financial-status',
  templateUrl: './financial-status.component.html',
  styleUrls: ['./financial-status.component.scss']
})
export class OverviewFinancialStatusComponent implements OnInit {

  private rows;
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';
  private chartColors: any[] = [{ backgroundColor: ["#113d57", "#a3c0c0", "#db4c63", "#4a4a4a", '#fbfbfb']}];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private participantsService: ParticipantService,
              private negotiationService: ProjectNegotiationService) {
  }

  ngOnInit() {
    this.negotiationService.negotiations$
      .mergeMap((data) => {
        return Observable.from(<any[]> data)
      })
      .combineLatest(this.participantsService.participants$)
      .map(([negotiation, participants]) => {
        negotiation['bankName'] = this.participantsService.getParticipantName(negotiation['participantBankID'], participants);
        this.pieChartLabels.push(negotiation['bankName']);
        this.pieChartData.push(negotiation['amount'])
        return negotiation;
      }).scan((acc, value) => {
      let elem = acc.find(elem => {
        return elem['loanNegotiationID'] === value['loanNegotiationID']
      });

      if (!!elem) {
        return acc;
      }

      return <any[]>acc.concat(value);
    }, [])
      .subscribe((negotiations) => {
        this.rows = negotiations;
      });
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
