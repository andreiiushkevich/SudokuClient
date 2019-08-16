import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cell} from '../cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input('cell-value') value: number;
  @Input('cell-row') row: number;
  @Input('cell-column') column: number;
  @Output() cellChange = new EventEmitter<Cell>();

  constructor() { }

  ngOnInit() {
  }

  onKeyUp(val: number) {
    this.cellChange.emit({ Value: val, Row: this.row, Column: this.column } as Cell);
  }
}
