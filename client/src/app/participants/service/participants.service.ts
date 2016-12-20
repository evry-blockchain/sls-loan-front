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
      name: 'Nationwide Building Society',
      image: 'img/bankLogos/nationwide.png'
    },
    {
      name: 'Barclays',
      image: 'img/bankLogos/barklays.jpg'
    },
    {
      name: 'JPMorgan Chase & Co',
      image: 'img/bankLogos/jp.jpg'
    },
    {
      name: 'Mizuho Bank, Ltd.',
      image: 'img/bankLogos/mizuho.png'
    },
    {
      name: 'SpareBank 1 SR-BANK',
      image: 'img/bankLogos/sparebank.jpg'
    },
    {
      name: 'DNB ASA',
      image: 'img/bankLogos/dnb.jpg'
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
    let found;
    participants.forEach((participant) => {
      found = this.partners.filter(item => item.name == participant['participantName'])[0];
      participant.image = found ? found['image'] : this.partners[0]['image'];
    });
    return participants;
  });

  public requestMapping;

  constructor(private http: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint) {
    this.requestMapping = `${this.apiEndpoint}/participants`;
  }

  query(): Observable<any> {
    var query = this.http.get(this.requestMapping).share();

    query.subscribe((participants) => {
      this.participantsSource.next(participants);
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
