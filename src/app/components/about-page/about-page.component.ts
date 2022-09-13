import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { Title } from '@angular/platform-browser';
import { ProgressBarService } from 'src/app/services/progress-bar/progress-bar.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  constructor(private navbarService: NavbarService, private title: Title, public progressBar: ProgressBarService) { }

  ngOnInit(): void {
    this.progressBar.startLoading();

    this.navbarService.setDefault();
    this.title.setTitle("About | Kanban");

    this.progressBar.completeLoading();
  }

}
