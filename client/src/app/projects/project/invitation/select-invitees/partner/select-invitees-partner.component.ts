/**
 * Created by Oleksandr.Khymenko on 08.10.2016.
 */

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Input } from "@angular/core";

@Component({
  selector: 'select-invitees-partner',
  templateUrl: 'select-invitees-partner.component.html',
  styleUrls: ['./select-invitees-partner.component.scss']

})
export class SelectInviteesPartnerComponent implements OnInit {

  @Input() partner;

  private selected: boolean = false;

  constructor() { }

  ngOnInit() { }


  selectUnselectPartner(partner) {
    if (!this.selected) {
      partner.style.backgroundColor = ' #a3c0c0';
    } else {
      partner.style.backgroundColor = '#fff';
    }

    this.selected = !this.selected;
  }

}
