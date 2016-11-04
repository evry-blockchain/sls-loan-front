import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ParticipantService} from "../../../participants/service/participants.service";
import {ProjectsService} from "../../service/projects.service";
import {UserService} from "../../../user/user.service";

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Invitation` component loaded asynchronously');

@Component({
  selector: 'invitation-component',
  styleUrls: ['invitation.component.scss'],
  templateUrl: 'invitation.template.html'
})
export class InvitationComponent {
  localState;

  value = 1;

  isBankOwner;

  constructor(public route: ActivatedRoute,
              private router: Router,
              private participantsService: ParticipantService,
              private projectService: ProjectsService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.participantsService.query();
    this.route.parent.parent.params.subscribe(data => {
      let id = +data['id'];
      this.projectService.get(id).combineLatest(this.userService.user$)
        .map(([project, user]) => {
          return {bankOwner: project['arrangerBankID'] === user['participantKey'], project: project, user: user};
        }).subscribe((response) => {
        if (response['bankOwner']) {
          this.router.navigate(['./create'], {relativeTo: this.route})
        } else {
          this.router.navigate(['./participant'], {relativeTo: this.route})
        }
      })
    });

    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    // this.asyncDataWithWebpack();
  }

  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    // var asyncMockDataPromiseFactory = require('es6-promise!assets/mock-data/mock-data.json');
    // setTimeout(() => {
    //
    //   let asyncDataPromise = asyncMockDataPromiseFactory();
    //   asyncDataPromise.then(json => {
    //     console.log('async mockData', json);
    //   });
    //
    // });
  }

}
