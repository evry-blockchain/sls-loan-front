import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectsService} from "../../../service/projects.service";
import {ParticipantService} from "../../../../participants/service/participants.service";
import {ProjectNegotiationService} from '../../service/project-negotiation.service';
import {Observable} from "rxjs";


@Component({
  selector: 'select-invitees-component',
  styleUrls: ['select-invitees.component.scss'],
  templateUrl: 'select-invitees.template.html'
})

export class SelectInviteesComponent implements OnInit {
  negotiations;
  selectedInvitees;
  participants$;
  partners = [];


  search = (text$: Observable<any>) => {
    return text$
      .debounceTime(200)
      .distinctUntilChanged()
      .combineLatest(this.participants$)
      .map(([term, participants]) => {
        return term.length < 1 ? []
          : participants.filter(v => new RegExp(term, 'gi').test(v['participantName'])).splice(0, 10);
      })
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectsService: ProjectsService,
              private participantService: ParticipantService,
              private projectNegotiationService: ProjectNegotiationService) {
  }

  participants;

  formatter = () => {
    return ''
  };


  ngOnInit(): void {
    this.participantService.query();

    this.projectsService.selectedInvitees$.connect();

    this.projectsService.selectedInvitees$
      .subscribe((invitees) => {
        this.selectedInvitees = invitees;
      });
    this.participants$ = this.participantService.participants$;

    this.participantService.participants$
      .combineLatest(this.projectsService.selectedInvitees$)
      .map(([participants, selectedInvitees]) => {
        participants = participants.map(participant => {
          if (participant['participantKey'] && selectedInvitees.find(item => item['participantKey'] == participant['participantKey'])) {
            participant['selected'] = true;
          }
          return participant;
        });

        return participants;
      }).mergeMap(data => Observable.from(data))
      .scan((acc: any[], item) => {
        let elem = acc.find(elem => {
          return elem['participantKey'] === item['participantKey']
        });

        if (!!elem) {
          return acc;
        }
        return <any[]>acc.concat(item);
      }, [])
      .subscribe((participants) => {
        this.partners = participants;
      });


    this.route.parent.parent.parent.params.mergeMap(data => {
      return this.projectNegotiationService.getNegotiationsForProject(data['id']);
    }).mergeMap(negotiations => {
      this.negotiations = negotiations;
      return this.participants$;
    }).mergeMap((data: any[]) => {
      return Observable.from(data);
    }).scan((acc: any[], participant) => {
      let found = this.negotiations.length && this.negotiations.find(item => item['participantBankID'] == participant['participantKey']);
      if (found && acc.indexOf(participant) === -1) {
        participant['negotiation'] = found;
        if (this.selectedInvitees.indexOf(participant) === -1) {
          this.addSelectedInvitee(participant)
        }
        return <any[]>acc.concat(participant);
      }
      return acc;
    }, [])
      .subscribe(() => {
        // console.log(data);
      });
  }

  nextTab(noInviteeModal) {
    if (this.selectedInvitees.length === 0) {
      noInviteeModal.show()
    } else {
      this.router.navigate(['../send'], {relativeTo: this.route});
    }
  }

  selectParticipant(event) {
    this.addSelectedInvitee(event['item']);
  }

  addSelectedInvitee(invitee) {
    invitee.selected = true;
    this.projectsService.addSelectedInvitation(invitee);
  }

  removeSelectedInvitee(invitee) {
    this.projectsService.removeInvitee(invitee);
  }
}
