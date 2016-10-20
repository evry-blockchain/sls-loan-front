/**
 * Created by Oleksandr.Khymenko on 13.10.2016.
 */


import { Injectable, Inject } from '@angular/core';
import { ApiGateway } from "../../api-gateway.service";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable()
export class ParticipantService {

  private participantsSource = new BehaviorSubject([]);

  private partners = [
    {
      name: 'Bank of Associates & Companies LTD',
      image: 'https://media.glassdoor.com/sql/23198/dnb-nor-squarelogo-1448458669964.png'
    },
    {
      name: 'Bank of America',
      image: 'http://www.megaicons.net/static/img/icons_sizes/40/110/48/bank-of-america-icon.png'
    },
    {
      name: 'Connected Collborators Bank',
      image: 'http://icons.iconarchive.com/icons/chrisbanks2/cold-fusion-hd/64/wellsfargo-2-icon.png'
    },
    {
      name: 'Bank of Paper, Wilson & Bluemine LTD',
      image: 'https://www.cebglobal.com/blogs/files/2014/01/PNCIcon-150x150.jpg'
    },
    {
      name: 'Bank of Associates & Companies LTD',
      image: 'http://www.megaicons.net/static/img/icons_sizes/40/110/64/bank-of-america-icon.png'
    },
    {
      name: 'Bank of America',
      image: 'http://www.megaicons.net/static/img/icons_sizes/40/110/48/bank-of-america-icon.png'
    },
    {
      name: 'Connected Collborators Bank',
      image: 'http://icons.iconarchive.com/icons/chrisbanks2/cold-fusion-hd/64/wellsfargo-2-icon.png'
    },
    {
      name: 'Bank of Paper, Wilson & Bluemine LTD',
      image: 'https://www.cebglobal.com/blogs/files/2014/01/PNCIcon-150x150.jpg'
    }
  ];

  public participants$ = this.participantsSource.asObservable().map((participants) => {
    participants.forEach((participant, index) => {
      participant.image = !!this.partners[index] ? this.partners[index]['image'] : this.partners[1]['image'];
    });
    return participants;
  });

  public requestMapping;

  constructor(private http: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint) {
    this.requestMapping = `${this.apiEndpoint}/participants`;
  }

  query(): Observable<any> {
    var query = this.http.get(this.requestMapping).cache();

    query.subscribe((projects) => {
      this.participantsSource.next(projects);
    });

    return query;
  }

  getParticipantName(id, participants) {
    var obj =  participants.find((item) => {
      return item['participantKey'] === id;
    })
    return !!obj ? obj['participantName'] : '';
  }
}
