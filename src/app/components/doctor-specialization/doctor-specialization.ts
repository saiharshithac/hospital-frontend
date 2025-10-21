import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from "../../header/header";
import { DoctorService } from '../../services/doctor-service';

@Component({
  selector: 'app-doctor-specialization',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './doctor-specialization.html',
  styleUrls: ['./doctor-specialization.css']
})
export class DoctorSpecialization {
  formData = {
    personId: '',
    speciality: '',
    yearsOfReg: ''
  };

  constructor(private router:Router,private doct:DoctorService,private route:ActivatedRoute) {}

  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    const id = params['id'];
    if (id) {
      this.formData.personId = id;
    } else {
      console.warn('No person ID found in query params');
    }
  });
}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.doct.addSpeciality(Number(this.formData.personId), {
        speciality: this.formData.speciality,
        yearsOfReg: Number(this.formData.yearsOfReg)
      
      }).subscribe({
        next: (response) => {
          console.log('Specialization added successfully', response);
          // this.router.navigate(['/']);
          form.resetForm();
        },
        error: (error) => {
          console.error('Error adding specialization', error);
        }
      });
    }
  }
}