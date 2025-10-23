import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../../header/header';
import { PersonService } from '../../services/person-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [FormsModule, CommonModule, Header],
  templateUrl: './doctors.html',
  styleUrls: ['./doctors.css'],
})
export class Doctors {
  selectedDoctorId: number | null = null;
  selectDoctor(id: number): void {
    this.selectedDoctorId = id;
    console.log('Selected Doctor ID:', id);

    this.router.navigate(['/appointment'], { queryParams: { personid: id } });
    console.log('Navigating to appointment with personId:', id);
  }
  searchTerm: string = '';
  doctors: any[] = [];
  DoctorsBySpeciality: any[] = [];
  constructor(private personService: PersonService, private router: Router) {
    this.personService.getPersonDetailsByRole('Doctor').subscribe({
      next: (data) => {
        this.doctors = data.$values;
        this.DoctorsBySpeciality = [...this.doctors];
        console.log('Doctors data loaded:', this.doctors);
      },
      error: (error) => {
        console.error('Error loading doctors data:', error);
      },
    });
  }
 searchBySpeciality(): void {
  const term = this.searchTerm.trim().toLowerCase(); // normalize search term
  if (term === '') {
    this.DoctorsBySpeciality = [...this.doctors];
  } else {
    this.DoctorsBySpeciality = this.doctors.filter((doctor) =>
      doctor.speciality.toLowerCase().includes(term) // normalize speciality
    );
  }
}
}
