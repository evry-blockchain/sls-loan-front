/**
 * Created by Oleksandr.Khymenko on 20.10.2016.
 */
import {Injectable, Inject} from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { User } from "./model/user.model";
import {ApiGateway} from "../api-gateway.service";

@Injectable()
export class UserService {
  private userSource = new BehaviorSubject({});

  user$ = this.userSource.asObservable();

  constructor(private http: ApiGateway, @Inject('ApiEndpoint') private apiEndpoint) {}


  public getRole(id, user) {
    if (id === user['participantKey']) {
      return 'Arranger Bank'
    } else {
      return 'Participant Bank'
    }
  }

  loginUser(user: User) {
    this.http.get(`${this.apiEndpoint}/utils/userId`).subscribe(data => {
      user.userId = data;
      this.http.get(`${this.apiEndpoint}/participantUsers`, {
        filter: {
          userID: data
        }
      }).subscribe(data => {
        user.userName = data['userName'];
      });
      this.userSource.next(user)
    });
  }

}
