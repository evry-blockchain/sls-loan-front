/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'send-invitation',
    templateUrl: 'send-invitation.component.html'
})
export class SendInvitationComponent implements OnInit {
  project;
  constructor() { }

  ngOnInit() {
    this.project = {
      borrower: 'Statoil',
      projectName: 'USD 100m Statoil',
      contactPerson: 'Per Person',
      loanAmount: '500m USD',
      marketIndustry: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis delectus dolor doloremque doloribus dolorum ducimus fuga incidunt. Accusantium cumque molestiae nesciunt officia quisquam sunt tempore. Assumenda consequuntur excepturi nesciunt rerum.'

    }
  }

}
