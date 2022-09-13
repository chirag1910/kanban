import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Column } from 'src/app/models/column/column.model';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProgressBarService } from 'src/app/services/progress-bar/progress-bar.service';
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  @Input() column: Column = {'name': "", 'list': []};
  @Input() boardName: string = "";
  @Output() onDeleteColumn: EventEmitter<Column> = new EventEmitter<Column>();

  listItems: string[] = [];

  constructor(private apiService: ApiService, private router: Router, public progressBar: ProgressBarService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.progressBar.startLoading();

    this.loadData();

    this.progressBar.completeLoading();
  }

  loadData(): void {
    let listItemsData = this.apiService.getListItems(this.boardName, this.column);
    if (listItemsData) {
      listItemsData.subscribe((data) => { this.listItems = data; });
    }
    else{ 
      alert("404 NOT FOUND");
      this.router.navigateByUrl("/");
    }
  }

  deleteColumn(columnToDelete: Column): void {
    this.onDeleteColumn.emit(columnToDelete);
  }

  createListItem(desc: string): void {
    this.progressBar.startLoading();

    let listData = this.apiService.createListItem(this.boardName, this.column, desc);
    if (listData) {
      listData.subscribe((desc) => { this.listItems.push(desc); });
      this.alertService.success("Item added!");
    }
    else {
      this.alertService.danger("Unable to add item!");
    }

    this.progressBar.completeLoading();
  }

  deleteListItem(listItem: string): void {
    this.progressBar.startLoading();

    this.apiService.deleteListItem(this.boardName, this.column, listItem).subscribe(() => { 
      this.listItems = this.listItems.filter(c => c !== listItem);
    });

    this.alertService.success("Item deleted!");
    this.progressBar.completeLoading();
  }

  drop(event: CdkDragDrop<string[]>) {
    this.progressBar.startLoading();

    if (event.previousContainer === event.container) {
      this.apiService.shiftInSameColumn(this.boardName, this.column, event.previousIndex, event.currentIndex);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.apiService.shiftAcrossColumn(this.boardName, event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

    this.progressBar.completeLoading();
  }
}
