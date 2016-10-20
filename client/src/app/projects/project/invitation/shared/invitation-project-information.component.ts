/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */

import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'invitation-project-information',
  templateUrl: 'invitation-project-information.component.html',
  styleUrls: ['./shared.component.scss']

})
export class InvitationProjectInformationComponent implements OnInit {
  @Input() project;

  constructor() { }

  ngOnInit() { }

}
