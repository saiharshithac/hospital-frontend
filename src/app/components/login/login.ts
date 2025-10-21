import { Component } from '@angular/core';
import { PersonService } from '../../services/person-service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: PersonService, private router: Router) {}

  onLogin(form: NgForm) {
    if (form.valid) {
      this.loginService.validateUser(this.username, this.password).subscribe({
        next: (response) => {
          console.log('Successfully logged in', response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.errorMessage = 'Invalid username or password';
        }
      });
    }
  }
}
