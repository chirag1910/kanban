import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board/board.model';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Title } from '@angular/platform-browser';
import { ProgressBarService } from 'src/app/services/progress-bar/progress-bar.service';
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  boards: Board[] = [];

  constructor(private navbarService: NavbarService, private apiService: ApiService, private title: Title, public progressBar: ProgressBarService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.progressBar.startLoading();

    this.navbarService.setDefault();
    this.title.setTitle("Home | Kanban");
    this.loadData();

    this.progressBar.completeLoading();
  }

  loadData(): void {
    this.apiService.getData().subscribe((data) => { this.boards = data; });
  }

  createBoard(board: Board): void {
    this.progressBar.startLoading();

    let boardData = this.apiService.createBoard(board);
    if (boardData) {
      boardData.subscribe((board) => {this.boards.push(board);});
      this.alertService.success("Board created!");
    }
    else{
      this.alertService.danger("Board already exists with same name!");
    }

    this.progressBar.completeLoading();
  }

  deleteBoard(board: Board): void {
    this.progressBar.startLoading();

    this.apiService.deleteBoard(board).subscribe(() => {
      this.boards = this.boards.filter(b => b.name !== board.name);
    });

    this.alertService.success("Board deleted!");
    this.progressBar.completeLoading();
  }
}
