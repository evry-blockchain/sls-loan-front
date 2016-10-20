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

  constructor(private router: Router,
              private route: ActivatedRoute) {
      this.partners = [
        {
          name: 'Bank of Associates & Companies LTD',
          image: 'https://media.glassdoor.com/sql/23198/dnb-nor-squarelogo-1448458669964.png'
        },
        {
          name: 'Bank of America',
          image: 'http://www.megaicons.net/static/img/icons_sizes/40/110/48/bank-of-america-icon.png'
        },
        {
          name: 'Connected Collborators Bank',
          image: 'http://icons.iconarchive.com/icons/chrisbanks2/cold-fusion-hd/64/wellsfargo-2-icon.png'
        },
        {
          name: 'Bank of Paper, Wilson & Bluemine LTD',
          image: 'https://www.cebglobal.com/blogs/files/2014/01/PNCIcon-150x150.jpg'
        },
        {
          name: 'Bank of Associates & Companies LTD',
          image: 'http://www.megaicons.net/static/img/icons_sizes/40/110/64/bank-of-america-icon.png'
        },
        {
          name: 'Bank of America',
          image: 'http://www.megaicons.net/static/img/icons_sizes/40/110/48/bank-of-america-icon.png'
        },
        {
          name: 'Connected Collborators Bank',
          image: 'http://icons.iconarchive.com/icons/chrisbanks2/cold-fusion-hd/64/wellsfargo-2-icon.png'
        },
        {
          name: 'Bank of Paper, Wilson & Bluemine LTD',
          image: 'https://www.cebglobal.com/blogs/files/2014/01/PNCIcon-150x150.jpg'
        }
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
    invitee.selected = true;
    this.selectedInvitees.push(invitee)
  }

  removeSelectedInvitee(invitee) {
    invitee.selected = false;
    this.selectedInvitees = this.selectedInvitees.filter((data) => {
      return data !== invitee;
    });
  }

  removePartner() {

  }
}
