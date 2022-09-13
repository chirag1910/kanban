import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() listItem: string = "";
  @Output() onDeleteListItem: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteListItem(listItemToDelete: string) {
    this.onDeleteListItem.emit(listItemToDelete);
  }

}
