import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { Router} from '@angular/router';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
isHomePage = true;

  constructor(private router: Router) {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       this.isHomePage = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/home';
  //     }
  //   });

  }
}
