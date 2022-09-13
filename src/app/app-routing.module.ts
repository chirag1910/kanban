import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BoardPageComponent } from './components/board-page/board-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';

const routes: Routes = [
  {'path': '', 'component': HomePageComponent},
  {'path': 'board', 'component': BoardPageComponent},
  {'path': 'about', 'component': AboutPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
