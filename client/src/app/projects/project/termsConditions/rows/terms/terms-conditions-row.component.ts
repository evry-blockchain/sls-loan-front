import {Component, OnInit, Input} from '@angular/core';
import {UtilsService} from "../../../../service/utils.service";

@Component({
  selector: 'terms-conditions-row',
  templateUrl: 'terms-conditions-row.component.html',
  styleUrls: ['terms-conditions-row.component.scss']
})
export class TermsConditionsRowComponent implements OnInit {
  @Input() paragraphs;
  private isProjectOwner;
  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    this.isProjectOwner = this.utilsService.isProjectOwner$;
  }

}
