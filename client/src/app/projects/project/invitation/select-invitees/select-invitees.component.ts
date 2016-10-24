import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectsService } from "../../../service/projects.service";
import { ParticipantService } from "../../../../participants/service/participants.service";
import { Observable } from "rxjs";


@Component({
    selector: 'select-invitees-component',
    styleUrls: ['select-invitees.component.scss'],
    templateUrl: 'select-invitees.template.html'
})

export class SelectInviteesComponent implements OnInit {

  selectedInvitees;

  participants$;

  public model: any;


  search = (text$: Observable<any>)  => {
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
              private participantService: ParticipantService) {}

  participants;

  formatter = (result: string) => {
   return ''
  };


  ngOnInit(): void {
    this.projectsService.selectedInvitees$.connect();

    this.projectsService.selectedInvitees$
      .subscribe((invitees) => {
        this.selectedInvitees = invitees;
    });

    this.participants$ = this.participantService.participants$;
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
