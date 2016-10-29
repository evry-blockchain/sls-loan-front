/**
 * Created by Oleksandr.Khymenko on 20.10.2016.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { User } from "./model/user.model";

@Injectable()
export class UserService {
  private userSource = new BehaviorSubject({});

  user$ = this.userSource.asObservable();

  constructor() {}


  public getRole(id, user) {
    if (id === user['participantKey']) {
      return 'Arranger Bank'
    } else {
      return 'Participant Bank'
    }
  }

  loginUser(user: User) {
    this.userSource.next(user)
  }

}
