import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgProgressModule } from 'ngx-progressbar';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AlertModule } from 'ngx-alerts';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateNewBoardComponent } from './components/home-page/create-new-board/create-new-board.component';
import { MyBoardsComponent } from './components/home-page/my-boards/my-boards.component';
import { BoardPageComponent } from './components/board-page/board-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ColumnComponent } from './components/board-page/column/column.component';
import { CreateColumnComponent } from './components/board-page/create-column/create-column.component';
import { CreateListItemComponent } from './components/board-page/column/create-list-item/create-list-item.component';
import { ListItemComponent } from './components/board-page/column/list-item/list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    CreateNewBoardComponent,
    MyBoardsComponent,
    BoardPageComponent,
    AboutPageComponent,
    ColumnComponent,
    CreateColumnComponent,
    CreateListItemComponent,
    ListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    DragDropModule,
    NgProgressModule,
    BrowserAnimationsModule,
    AlertModule.forRoot({maxMessages: 1, timeout: 5000, positionX: 'right', positionY: 'top'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
