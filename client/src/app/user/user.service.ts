/**
 * Created by Oleksandr.Khymenko on 20.10.2016.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable()
export class UserService {
  private userSource = new BehaviorSubject({});

  user$ = this.userSource.asObservable();
  constructor() {
    this.userSource.next({
      image: "http://icons.iconarchive.com/icons/chrisbanks2/cold-fusion-hd/64/wellsfargo-2-icon.png",
      participantKey: "1",
      participantName: "Bank of Associates & Companies LTD",
      participantType: "Bank"
    })
  }


  public getRole(id, user) {
    if (id === user['participantKey']) {
      return 'Arranger Bank'
    } else {
      return 'Participant Bank'
    }
  }

}
