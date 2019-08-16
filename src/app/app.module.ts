import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {WinnerService} from './winner.service';
import {NgbdModalContent, ParticipantComponent} from './participant/participant.component';
import {FormsModule} from '@angular/forms';
import { OnlyNumberDirective } from './only-number.directive';
import {CookieService} from 'ngx-cookie-service';
import { SudokuBoardComponent } from './sudokuboard/sudoku-board.component';
import { CellComponent } from './cell/cell.component';
import {SudokuBoardService} from './sudoku-board.service';
import {IdentityService} from './identity.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ParticipantComponent,
    OnlyNumberDirective,
    SudokuBoardComponent,
    CellComponent,
    NgbdModalContent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule
  ],
  providers: [SudokuBoardService, WinnerService, CookieService, IdentityService],
  bootstrap: [AppComponent],
  entryComponents: [NgbdModalContent]
})
export class AppModule { }
