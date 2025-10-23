import { Component } from '@angular/core';
import { Header } from '../../header/header';
import { Login } from '../login/login';
import { Router } from '@angular/router';
import { Footer } from "../../footer/footer";

@Component({
  selector: 'app-homepage',
  imports: [Header, Footer],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage {
  constructor(private router: Router) {}
  onClickLogin() {
  this.router.navigate(['/login']);
}
}
