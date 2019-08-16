import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Cell } from './cell';
import { Observable } from 'rxjs';

const WS_URL = 'wss://localhost:5001/board';

@Injectable()
export class SudokuBoardService {
  private webSocketSubject: WebSocketSubject<any>;

  private get wsSubject(): WebSocketSubject<any> {
    if (this.webSocketSubject === undefined || this.webSocketSubject.closed) {
      this.webSocketSubject = new WebSocketSubject(WS_URL);
    }
    return this.webSocketSubject;
  }

  public cellDataUpdates(): Observable<Array<Cell>> {
    return this.wsSubject.asObservable();
  }

  public sendData(data: Cell) {
    this.webSocketSubject.next(data);
  }
}
