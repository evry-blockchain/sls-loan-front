/**
 * Created by Oleksandr.Khymenko on 08.10.2016.
 */

import {
  Component, OnInit, Output, EventEmitter, HostBinding
} from '@angular/core';
import { Input } from "@angular/core";

@Component({
  selector: 'select-invitees-partner',
  templateUrl: 'select-invitees-partner.component.html',
  styleUrls: ['./select-invitees-partner.component.scss']

})
export class SelectInviteesPartnerComponent implements OnInit {
  @Input() partner;
  @Output() selectInvitee = new EventEmitter();
  @Output() unselectInvitee = new EventEmitter();
  @HostBinding('class') hostClass = "row";
  selected: boolean = false;

  constructor() { }

  ngOnInit() { }


  selectUnselectPartner() {

    if (!this.partner.selected) {
      this.selectInvitee.emit(this.partner);
    } else {
      this.unselectInvitee.emit(this.partner);
    }

  }

}
