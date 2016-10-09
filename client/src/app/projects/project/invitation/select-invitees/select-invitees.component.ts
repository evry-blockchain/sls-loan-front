import {Component} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";


@Component({
    selector: 'select-invitees-component',
    styleUrls: ['select-invitees.component.scss'],
    templateUrl: 'select-invitees.template.html'
})

export class SelectInviteesComponent {

  partners = [];

  selectedInvitees = [];

  companies = [
    {
      name: 'Bank of America',
      image: 'http://www.megaicons.net/static/img/icons_sizes/40/110/64/bank-of-america-icon.png'
    },
    {
      name: 'Bank of America',
      image: 'http://www.megaicons.net/static/img/icons_sizes/40/110/48/bank-of-america-icon.png'
    },
    {
      name: 'Bank of America',
      image: 'http://icons.iconarchive.com/icons/chrisbanks2/cold-fusion-hd/64/wellsfargo-2-icon.png'
    },
    {
      name: 'Bank of America',
      image: 'https://www.cebglobal.com/blogs/files/2014/01/PNCIcon-150x150.jpg'
    }
  ];

  constructor(private router: Router,
              private route: ActivatedRoute) {
      this.partners = [
          'Bank of Associates & Companies LTD',
          'Bank of Associates & Companies LTD',
          'Connected Collborators Bank',
          'Bank of Paper, Wilson & Bluemine LTD',
          'Bank of Housing Construction Inc'
      ];


  }

  nextTab(noInviteeModal) {
    if (this.selectedInvitees.length === 0) {
      noInviteeModal.show()
    } else {
      this.router.navigate(['../send'], {relativeTo: this.route});
    }
  }

  addSelectedInvitee(invitee) {
    this.selectedInvitees.push(invitee)
  }

  removeSelectedInvitee(invitee) {
    this.selectedInvitees = this.selectedInvitees.filter((data) => {
      return data !== invitee;
    });
  }
}
