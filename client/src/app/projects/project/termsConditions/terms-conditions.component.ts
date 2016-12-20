import {Component, OnInit} from '@angular/core';
import {TermsConditionsService} from "../../service/terms-conditions.service";
import {UtilsService} from "../../service/utils.service";
import {Observable} from "rxjs";

@Component({
  selector: 'terms-conditions',
  templateUrl: 'terms-conditions.component.html',
  styleUrls: ['terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {

  private paragraphs: Observable<any>;
  constructor(private termsService: TermsConditionsService) {
  }


  ngOnInit() {
    this.paragraphs = this.termsService.termsConditionsForCurrentProject$;

    // this.utilsService.isProjectOwner$.subscribe(data => {
    //   this.isProjectOwner = data;
    // });
  }

}
