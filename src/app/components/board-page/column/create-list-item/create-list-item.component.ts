import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-list-item',
  templateUrl: './create-list-item.component.html',
  styleUrls: ['./create-list-item.component.css']
})
export class CreateListItemComponent implements OnInit {

  @Output() onCreateListItem: EventEmitter<string> = new EventEmitter<string>();

  desc: string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

  createListItem(): void {
    this.onCreateListItem.emit(this.desc);
    this.desc = "";
  }

}
