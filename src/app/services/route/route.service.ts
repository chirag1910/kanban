import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private router: Router) { }

  currentRoute(): string {
    return this.router.url;
  }

  isRoute(url: string): boolean {
    return (url === this.currentRoute() ? true : false);
  }

  isEitherRoute(...urls: string[]): boolean {
    for(let i = 0; i < urls.length; i++) {
      if(urls[i] == this.currentRoute()) {
        return true;
      }
    }
    return false;
  }
}
