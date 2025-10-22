import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person-service';
import { AppointmentService } from '../../services/appointment-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css',
})
export class DoctorDashboard implements OnInit {
  personId: number | null = 3;
  persons: any = null;
  appointments: any = null;
  selectedAppointmentId: any = null;
  activeSection: string = 'appointments';
  patients: any = null;

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
    this.personService.getPersonDetailsByRole('Patient').subscribe({
      next: (data) => {
        this.patients = data;
        console.log('Received patients:', data);
      },
      error: (err) => console.error('Error fetching patients:', err),
    });
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
  showSection(section: string): void {
    this.activeSection = section;
  }

  selectedPatient : any = null;
   treatmentData = {
    DoctorId : '',
    PatientId : '',
    Diagnosis : '',
    Description : '',
    Prescription: '',
    FollowUp: '',
    CreatedAt: '',
  }
  openTreatmentForm(patients : any){
    this.selectedPatient = patients;
    this.treatmentData.PatientId = patients.personId;
  }

  submitTreatment() {
  const data = { ...this.treatmentData };

  console.log('Submitting treatment:', data);
  }

  cancel(){
    this.selectedPatient = null;
  }

}
