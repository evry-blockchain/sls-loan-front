/**
 * Created by Oleksandr.Khymenko on 13.10.2016.
 */


import {Injectable, Inject} from '@angular/core';
import {ApiGateway} from "../../api-gateway.service";
import {BehaviorSubject, Observable} from "rxjs";

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
      image: 'img/bankLogos/sp-sr-bank.png'
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
    },
    {
      name: 'Skandinaviska Enskilda Banken AB',
      image: 'img/bankLogos/seb.png'
    },
    {
      name: 'SpareBank 1 Hedmark',
      image: 'img/bankLogos/sp-hedmark.jpg'
    },
    {
      name: 'SpareBank 1 Modum',
      image: 'img/bankLogos/sp-modum.jpg'
    },
    {
      name: 'SpareBank 1 Nord-Norge',
      image: 'img/bankLogos/sp-nordnorge.jpg'
    }
  ];

  public participants$ = this.participantsSource.asObservable().mergeMap(data => Observable.from(data)).map((participant) => {
    let found;
    found = this.partners.filter(item => item.name == participant['participantName'])[0];
    participant.image = found ? found['image'] : this.partners[0]['image'];
    return participant;
  }).scan((acc: any[], el) => {
    return [...acc, el];
  }, []);

  public requestMapping;

  constructor(private http: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint) {
    this.requestMapping = `${this.apiEndpoint}/participants`;
  }

  query(): Observable<any> {
    let query = this.http.get(this.requestMapping).share();

    query.subscribe((participants) => {
      this.participantsSource.next(participants);
    });

    return query;
  }

  getParticipantName(id, participants) {
    let obj = participants.find((item) => {
      return item['participantKey'] === id;
    });
    return !!obj ? obj['participantName'] : '';
  }
}
