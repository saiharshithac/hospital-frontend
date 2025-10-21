import { Component } from '@angular/core';
import { Header } from '../../header/header';
import { Login } from '../login/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [Header],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage {
  constructor(private router: Router) {}
  onClickLogin() {
  this.router.navigate(['/login']);
}
}
