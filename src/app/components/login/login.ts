import { Component } from '@angular/core';
import { PersonService } from '../../services/person-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Header } from "../../header/header";
 
@Component({
  selector: 'app-login',
  imports: [FormsModule, Header, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  details={
    username:'',
    password:''
  }
 
  errorMessage: string = '';
 
  constructor(private loginService: PersonService, private router: Router) {}
 
  onLogin(form:NgForm) {
    if (form.valid) {
      this.loginService.validateUser(this.details).subscribe({
        next: (response) => {
          console.log('Successfully logged in', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('personId', response.personId.toString());
          this.router.navigate(['/doctor-dashboard'], { queryParams: { personId: response.personId} });
        },
        error: (err) => {
          console.error('Login failed', err);
          this.errorMessage = 'Invalid username or password';
        }
      });
    }
  }
 
}