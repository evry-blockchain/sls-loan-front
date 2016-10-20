import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'invitation-terms-conditions',
  templateUrl: './invitation-terms-conditions.component.html',
  styleUrls: ['./shared.component.scss']

})
export class InvitationTermsConditionsComponent implements OnInit {

  @Input() invitation;

  constructor() { }

  ngOnInit() { }

}
