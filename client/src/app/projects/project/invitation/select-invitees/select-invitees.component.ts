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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectsService: ProjectsService,
              private participants: ParticipantService) {

  }

  ngOnInit(): void {
    this.projectsService.selectedInvitees$.connect();

    this.projectsService.selectedInvitees$
      .subscribe((invitees) => {
        this.selectedInvitees = invitees;
    });

    this.participants$ = this.participants.participants$;
    }

  nextTab(noInviteeModal) {
    if (this.selectedInvitees.length === 0) {
      noInviteeModal.show()
    } else {
      this.router.navigate(['../send'], {relativeTo: this.route});
    }
  }

  addSelectedInvitee(invitee) {
    invitee.selected = true;
    this.projectsService.addSelectedInvitation(invitee);
  }

  removeSelectedInvitee(invitee) {
    this.projectsService.removeInvitee(invitee);
  }
}
