import {Component, OnInit} from '@angular/core';
import {ParticipantService} from "../../../../../participants/service/participants.service";
import {ProjectNegotiationService} from "../../../service/project-negotiation.service";
import {Observable} from "rxjs";
import {ProjectsService} from "../../../../service/projects.service";

@Component({
  selector: 'overview-financial-status',
  templateUrl: './financial-status.component.html',
  styleUrls: ['./financial-status.component.scss']
})
export class OverviewFinancialStatusComponent implements OnInit {

  private rows;
  private colors: string[] = ["#113d57", "#a3c0c0", "#db4c63", "#4a4a4a", '#fbfbfb', '#e4e4e4', '#d8d8d8', '#84a6b6'];
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';
  private chartColors: any[] = [{backgroundColor: this.colors}];
  private barStats = {};
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private participantsService: ParticipantService,
              private negotiationService: ProjectNegotiationService,
              private projectService: ProjectsService) {
  }

  ngOnInit() {
    let localNegotiations$ = this.negotiationService.negotiations$
      .mergeMap((data) => {
        return Observable.from(<any[]> data)
      })
      .combineLatest(this.participantsService.participants$)
      .map(([negotiation, participants]) => {
        negotiation['bankName'] = this.participantsService.getParticipantName(negotiation['participantBankID'], participants);

        if (this.pieChartLabels.indexOf(negotiation['bankName']) === -1) {
          this.pieChartLabels.push(negotiation['bankName']);
          this.pieChartData.push(negotiation['amount']);
        }

        return negotiation;
      }).scan((acc, value) => {
        let elem = acc.find(elem => {
          return elem['loanNegotiationID'] === value['loanNegotiationID'];
        });

        if (!!elem) {
          return acc;
        }

        return <any[]>acc.concat(value);
      }, []);

    localNegotiations$.subscribe(negotiations => {
      this.rows = negotiations;
    });

    this.projectService.project$.combineLatest(localNegotiations$).map(([project, negotiations]) => {
      let stats = {};
      stats['totalAmount'] = parseFloat(project['loanSharesAmount'].replace(/[a-z A-Z]/g, ''));
      stats['accepted'] = negotiations.reduce((acc, item) => {
        if (item['negotiationStatus'] == 'INTERESTED') {
          acc += +item.amount;
        }
        return acc;
      }, 0);

      stats['interested'] = negotiations.reduce((acc, item) => {
        if (item['negotiationStatus'] == 'INVITED') {
          acc += +item.amount;
        }
        return acc;
      }, 0);

      stats['left'] = stats['totalAmount'] - stats['accepted'] + stats['interested'];

      stats['acceptedPercentage'] = stats['accepted']/stats['totalAmount']*100;
      stats['interestedPercentage'] = stats['interested']/stats['totalAmount']*100;
      stats['leftPercentage'] = stats['left']/stats['totalAmount']*100;

      return stats;
    }).subscribe(data => {
      console.log(data);
      this.barStats = data;
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
