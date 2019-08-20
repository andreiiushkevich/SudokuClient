import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Cell} from '../cell';
import {SudokuBoardService} from '../sudoku-board.service';
import {IdentityService} from '../identity.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sudokuboard',
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SudokuBoardComponent implements OnInit, OnDestroy {

  board: Array<Array<number>> = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
  private subscription: Subscription;
  constructor(private sudokuBoardService: SudokuBoardService, private identityService: IdentityService) { }

  ngOnInit() {
    this.subscription = this.sudokuBoardService.cellDataUpdates().subscribe(cells => {
      for (const cell of cells) {
        this.board[cell.Row - 1][cell.Column - 1] = cell.Value;
      }
    });
    this.identityService.changed.subscribe(auth => {
      if (auth) {
        this.subscription = this.sudokuBoardService.cellDataUpdates().subscribe(cells => {
          for (const cell of cells) {
            this.board[cell.Row - 1][cell.Column - 1] = cell.Value;
          }
        });
      } else {
        this.subscription.unsubscribe();
      }
    });
  }

  onChange(cell: Cell) {
    this.sudokuBoardService.sendData(cell);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
