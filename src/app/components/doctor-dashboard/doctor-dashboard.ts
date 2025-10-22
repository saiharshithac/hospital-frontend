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
  styleUrls: ['./doctor-dashboard.css'],
})
export class DoctorDashboard implements OnInit {
  doctorId: number | null = null;
  appointments: any = null;
  selectedAppointmentId: any = null;
  activeSection: string = 'appointments';
  patients: any = null;
  persons: any = null;

  constructor(
    private personService: PersonService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.doctorId = params['personId'] ? Number(params['personId']) : null;
      console.log('Doctor Dashboard doctorId:', this.doctorId);
    if (this.doctorId !== null) {
    this.loadAppointmentDetails(this.doctorId!);
    this.loadPersonDetails(this.doctorId!);
    }
  });
}
  
  loadAppointmentDetails(id: number) {
    this.appointmentService.GetAppointmentsByDoctorId(id).subscribe({
      next: (data) => {
        this.appointments = data;
        console.log('Appointments loaded:', data);
      },
      error: (err) => {
        console.error('Error loading appointments');
      }
    }); 
  }
  Cancel(appointmentId: any){
    if (appointmentId) {
      this.appointmentService.cancelledAppointment(appointmentId).subscribe({
        next: (res) => {
          console.log('Appointment cancelled successfully:', res);
        },
        error: (err) => {
          console.error('Error cancelling appointment:', err);
        }
      }); 
    }
  }
  loadPersonDetails(personId: number) {
    this.personService.getPersonById(personId).subscribe({
      next: (data) => {
        console.log('Person details loaded:', data);
        this.persons = data;
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