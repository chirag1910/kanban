import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Column } from 'src/app/models/column/column.model';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.css']
})
export class CreateColumnComponent implements OnInit {

  @Output() onCreateColumn: EventEmitter<Column> = new EventEmitter<Column>();

  name: string = "";
  list: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  createColumn(): void {
    const newColumn: Column = {
      name: this.name,
      list: this.list
    }

    this.onCreateColumn.emit(newColumn);

    this.name = "";
  }

}
