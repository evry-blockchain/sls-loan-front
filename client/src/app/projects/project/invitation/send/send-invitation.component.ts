/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'send-invitation',
    templateUrl: 'send-invitation.component.html',
    styleUrls: ['./send-invitation.component.scss']
})
export class SendInvitationComponent implements OnInit {
  project;

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

  removeCompany(company) {
    this.companies = this.companies.filter(data => {
      return data !== company;
    })
  }

}
