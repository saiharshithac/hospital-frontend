import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person-service';
import { AppointmentService } from '../../services/appointment-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  templateUrl: './doctor-dashboard.html',
  styleUrls: ['./doctor-dashboard.css'],
  imports: [CommonModule]
})
export class DoctorDashboard implements OnInit {
  personId: number | null = 3;
  persons: any = null;
  appointments: any = null;
  selectedAppointmentId: any = null;

  constructor(
    private personService: PersonService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.personId = params['personid'] ? Number(params['personid']) : null;
      this.personId = 3; 
      console.log('Doctor Dashboard personId:', this.personId);
    if (this.personId !== null) {
    this.loadPersonDetails(this.personId);
    this.loadAppointmentDetails(this.personId);
    }
  });
}
  loadPersonDetails(id: number) {
    this.personService.getPersonById(id).subscribe({
      next: (data) => {
        this.persons = data;
        console.log('Persons loaded:', data);
      },
      error: (err) => {
        console.error('Error loading persons');
      }
    });
  }
  loadAppointmentDetails(id: number) {
    this.appointmentService.GetAppointmentsByPersonId(id).subscribe({
      next: (data) => {
        this.appointments = data;
        console.log('Appointments loaded:', data);
      },
      error: (err) => {
        console.error('Error loading appointments');
      }
    }); 
  }

}
