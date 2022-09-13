import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private navbarHeading: string = 'Kanban';

  constructor() { }

  setDefault(): void {
    this.navbarHeading = "Kanban";
  }

  setTitle(title: string): void {
    this.navbarHeading = title;
  }

  getTitle(): string {
    return this.navbarHeading;
  }
}
