import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from "../../header/header";
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../../services/person-service';
import { DoctorService } from '../../services/doctor-service';

@Component({
  selector: 'app-update-profile',
  imports: [FormsModule, CommonModule, Header],
  templateUrl: './update-profile.html',
  styleUrl: './update-profile.css'
})
export class UpdateProfile implements OnInit{
  personId: number = 0  ;
  personData:any={};
  roleSpecificData: any = {};
  appointments: any[] = [];
  constructor(private route: ActivatedRoute,private personService:PersonService,private doctorService:DoctorService) {}
  ngOnInit(): void {
  const storedId = localStorage.getItem('personId');
  if (storedId && !isNaN(+storedId)) {
    this.personId = +storedId;
    this.loadPersonDetails();
  } else {
    console.error('Invalid or missing personId in localStorage');
    // Optionally redirect to login or show error
  }
}

// loadAppointments() {
//   const personId = this.personData.personId;
//   this.apiService.getAppointmentsByPersonId(personId).subscribe({
//     next: (res) => {
//       this.appointments = res;
//     },
//     error: (err) => {
//       console.error('Error fetching appointments', err);
//     }
//   });
// }

  loadPersonDetails() {
    this.personService.getPersonById(this.personId).subscribe({
      next: (data) => {
        this.personData = data;
        console.log('Person data loaded:', this.personData);
        
          this.personService.getPersonDetailsByRole(this.personData.role).subscribe({
            next: (roleData) => {
              const match = roleData.$values?.find((p: any) => p.personId === this.personId);
              this.roleSpecificData = match || {};
              console.log('Role-specific data loaded:', this.roleSpecificData);
            },
            error: (error) => {
              console.error('Error loading role-specific data:', error);
            }
          });
      },
      error: (error) => {
        console.error('Error loading person data:', error);
      }
    });

    
  }
    onUpdate() {
      this.personService.updatePerson(this.personId, this.personData).subscribe({
        next: (response) => {
          console.log('Profile updated successfully', response);
          alert('Profile updated successfully');
        },
        error: (error) => {
          console.error('Error updating profile', error);
          alert('Error updating profile');
        }
      });
      this.doctorService.updateSpeciality(this.personId, this.roleSpecificData).subscribe({

        next: (response) => {
          console.log('Role-specific details updated successfully', response);
        },
        error: (error) => {
          console.error('Error updating role-specific details', error);
        }
      });
    }
  }

