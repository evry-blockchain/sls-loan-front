/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */


import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'invitation-additional-information',
  templateUrl: 'invitation-additional-info.component.html',
  styleUrls: ['./shared.component.scss']
})
export class InvitationAdditionalInformationComponent implements OnInit {
  @Input() invitation;

  constructor() { }

  ngOnInit() { }

}
