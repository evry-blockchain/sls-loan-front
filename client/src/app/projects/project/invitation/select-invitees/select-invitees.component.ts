import {Component} from '@angular/core';


@Component({
    selector: 'select-invitees-component',
    styleUrls: ['select-invitees.component.scss'],
    templateUrl: 'select-invitees.template.html'
})

export class SelectInviteesComponent {
    partners = [];

    constructor() {
        this.partners = [
            'Bank of Associates & Companies LTD',
            'Bank of Associates & Companies LTD',
            'Connected Collborators Bank',
            'Bank of Paper, Wilson & Bluemine LTD',
            'Bank of Housing Construction Inc'
        ];
    }

}
