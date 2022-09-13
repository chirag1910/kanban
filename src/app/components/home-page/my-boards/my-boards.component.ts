import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Board } from 'src/app/models/board/board.model';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-my-boards',
  templateUrl: './my-boards.component.html',
  styleUrls: ['./my-boards.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class MyBoardsComponent implements OnInit {
  @Input() board: Board;
  @Output() onDeleteBoard: EventEmitter<Board> = new EventEmitter<Board>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteBoard(board: Board){
    this.onDeleteBoard.emit(board);
  }
}
