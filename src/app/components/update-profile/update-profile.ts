import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule,NgIf } from '@angular/common';
import { Header } from "../../header/header";
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person-service';
import { DoctorService } from '../../services/doctor-service';
import { AppointmentService } from '../../services/appointment-service';

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
  constructor(private route: ActivatedRoute,private router:Router, private personService:PersonService,private doctorService:DoctorService,private appservice:AppointmentService) {}
//   ngOnInit(): void {
//   const storedId = localStorage.getItem('personId');
//   if (storedId && !isNaN(+storedId)) {
//     this.personId = +storedId;
//     this.loadPersonDetails();
//   } else {
//     console.error('Invalid or missing personId in localStorage');
//     // Optionally redirect to login or show error
//   }
// }
getPersonIdFromToken(): number | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || null;
  } catch (e) {
    console.error('Invalid token format', e);
    return null;
  }
}

ngOnInit(): void {
  const personIdFromToken = this.getPersonIdFromToken();
  if (personIdFromToken && !isNaN(+personIdFromToken)) {
    this.personId = +personIdFromToken;
    this.loadPersonDetails();
  } else {
    console.error('Invalid or missing personId in token');
    this.router.navigate(['/login']);
  }
}

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
 changeStatus(appt: any, newStatus: string) {
  if (newStatus === 'Cancelled' || newStatus === 'Update') {
    this.appservice.cancelAppointment(appt.appointmentId).subscribe({
      next: (res) => {
        console.log('Appointment cancelled:', res);
        appt.status = newStatus; // Update UI immediately
        alert(`Appointment has been ${newStatus.toLowerCase()} successfully!`);

        if (newStatus === 'Update') {
          this.router.navigate(['/doctors']); // Redirect for Updated
        }
      },
      error: (err) => {
        console.error('Error updating appointment:', err);
      }
    });
  }
}
 onLogOut():void{
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('personId');
  this.router.navigate(['/login']);

 
}
getAppointments() {
  const personId = this.personId;
  this.appservice.AppointmentsByPersonId(personId).subscribe({
    next: (res: any) => {
      this.appointments = res.$values || []; // Extract actual array
      console.log('Appointments loaded:', this.appointments);
    },
    error: (err) => {
      console.error('Error fetching appointments:', err);
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

