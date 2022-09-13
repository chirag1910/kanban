import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Board } from 'src/app/models/board/board.model';
import { Column } from 'src/app/models/column/column.model';

@Component({
  selector: 'app-create-new-board',
  templateUrl: './create-new-board.component.html',
  styleUrls: ['./create-new-board.component.css']
})
export class CreateNewBoardComponent implements OnInit {

  @Output() onCreateBoard: EventEmitter<any> = new EventEmitter

  name: string = "";
  createdOn: Date = new Date();
  columns: Column[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  createBoard(): void {
    const newBoard: Board = {
      name: this.name,
      createdOn: this.createdOn,
      columns: this.columns
    }

    this.onCreateBoard.emit(newBoard);

    this.name = "";    
  }
}
