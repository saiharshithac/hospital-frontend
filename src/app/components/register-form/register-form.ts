import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person-service'; // Adjust path as needed
import { Header } from '../../header/header';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, CommonModule, Header],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.css']
})
export class RegisterForm {
  constructor(private personService:PersonService, private router: Router) {}

  formData = {
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    role: '',
    address: '',
    phoneNo: '',
    altNo: '',
    email: '',
    password: ''
  };

  showToast = false;

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Data:', this.formData);
      console.log(form);
      this.personService.registerPerson(this.formData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.showToast = true;

          const role = response.role?.toLowerCase();
          const personId = response.personId;

          setTimeout(() => {
            this.showToast = false;

            // Redirect based on role
            if (role === 'doctor') {
              this.router.navigate(['/doctor'], { queryParams: { id: personId } });
            } else if (role === 'patient') {
              this.router.navigate(['/patient'], { queryParams: { id: personId } });
            } else if (role === 'staff') {
              this.router.navigate(['/staff'], { queryParams: { id: personId } });
            } else {
              this.router.navigate(['/']); // fallback
            }
          }, 3000);

          form.resetForm();
        },
        error: (error: any) => {
          console.error('Registration failed:', error);
        }
      });
    }
  }
}