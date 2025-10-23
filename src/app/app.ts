import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { Router} from '@angular/router';
import { DoctorDashboard } from "./components/doctor-dashboard/doctor-dashboard";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, DoctorDashboard],
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
