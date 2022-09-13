import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Column } from 'src/app/models/column/column.model';
import { ApiService } from 'src/app/services/api/api.service';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { Title } from '@angular/platform-browser';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ProgressBarService } from 'src/app/services/progress-bar/progress-bar.service';
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnInit {

  boardName: string = "";

  columns: Column[] = [];
  
  constructor(private route: ActivatedRoute, private navbarService: NavbarService, private apiService: ApiService, private router: Router, private title: Title, public progressBar: ProgressBarService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.progressBar.startLoading();

      this.route.queryParams.subscribe(params => {
        this.boardName = params['name'];
      });
      this.navbarService.setTitle(this.boardName + " | Kanban");

      this.title.setTitle(this.boardName + " | Kanban");

      this.loadData();

    this.progressBar.completeLoading();
  }

  loadData(): void {
    let columnsData = this.apiService.getColumns(this.boardName);
    if (columnsData){
      columnsData.subscribe((data) => { this.columns = data; });
    }
    else{ 
      this.alertService.danger("Board not found!");
      this.router.navigateByUrl("/");
    }
  }

  createColumn(column: Column): void {
    this.progressBar.startLoading();

    let columnData = this.apiService.createColumn(this.boardName, column);
    if (columnData) {
      columnData.subscribe((column) => {this.columns.push(column);});
      this.alertService.success("Column created!");
    }
    else{
      this.alertService.danger("Column already exists!");
    }

    this.progressBar.completeLoading();
  }

  deleteColumn(column: Column): void {
    this.progressBar.startLoading();

    this.apiService.deleteColumn(this.boardName, column).subscribe(() => { 
      this.columns = this.columns.filter(c => c.name !== column.name);
    });

    this.alertService.success("Column deleted!");
    this.progressBar.completeLoading();
  }

  drop(event: CdkDragDrop<{name: string, list: string[]}[]>) {
    this.progressBar.startLoading();

    this.apiService.shiftInSameBoard(this.boardName, event.previousIndex, event.currentIndex)
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    
    this.progressBar.completeLoading();
  }
}
