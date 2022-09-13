import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { ProgressBarService } from 'src/app/services/progress-bar/progress-bar.service';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { RouteService } from 'src/app/services/route/route.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public progress: NgProgress, public progressBar: ProgressBarService, public navbarService: NavbarService, public routeService: RouteService) { }

  ngOnInit(): void {
    this.progressBar.progressRef = this.progress.ref('progressBar');
  }
}
