import { Injectable } from '@angular/core';
import {WebSocketSubject} from 'rxjs/webSocket';
import {Observable} from 'rxjs';
import {Participant} from './participant';

const WS_URL = 'wss://localhost:5001/winner';

@Injectable()
export class WinnerService {
  private webSocketSubject: WebSocketSubject<any>;

  private get wsSubject(): WebSocketSubject<any> {
    if (this.webSocketSubject === undefined || this.webSocketSubject.closed) {
      this.webSocketSubject = new WebSocketSubject(WS_URL);
    }
    return this.webSocketSubject;
  }

  public someOneWin(): Observable<Participant> {
    return this.wsSubject.asObservable();
  }
}
