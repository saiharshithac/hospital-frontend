import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person-service';
import { AppointmentService } from '../../services/appointment-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppointmentNotifications } from "../appointment-notifications/appointment-notifications";
import { TreatmentService } from '../../services/treatment-service';
import { MedicalHistory } from '../../services/medical-history';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, AppointmentNotifications],
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
  history: any = null;

  constructor(
    private personService: PersonService,
    private appointmentService: AppointmentService,
    private treatmentService: TreatmentService,
    private medicalhistory: MedicalHistory,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const storedId = localStorage.getItem('personId');
    const parsedId = storedId !== null ? Number(storedId) : null;
    this.doctorId = parsedId !== null && !isNaN(parsedId) ? parsedId : null;
      console.log('Doctor Dashboard doctorId:', this.doctorId);
    if (this.doctorId !== null) {
    this.loadAppointmentDetails(this.doctorId);
    this.loadPersonDetails(this.doctorId);
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
 
  selectedPatient: any = null;
  treatmentData = {
    DoctorId: '',
    PatientId: '',
    Dtype: '',
    Description: '',
    Prescription: '',
    FollowUp: '',
    CreatedAt: '',
  };
  openTreatmentForm(patients: any) {
    this.selectedPatient = patients;
    this.treatmentData.PatientId = patients.personId;
    this.treatmentData.DoctorId = this.doctorId!.toString();
  }
 
  submitTreatment() {
    const data = { ...this.treatmentData };
    console.log(data);
    this.treatmentService.createTreatment(data).subscribe({
      next: (response) => {
        console.log('Treatment submitted successfully:', response);
        alert(" Successfully added treatment");
        this.selectedPatient = null;
      },
      error: (err) => {
        console.error('Error submitting treatment:', err);
      },
    });
  }
  cancel() {
    this.selectedPatient = null;
  }
 
  getHistory(personId : any){
    this.medicalhistory.GetMedicalHistory(personId).subscribe({
      next: (blob) =>{
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'medical-history.docx';
      a.click();
      window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error loading medicalHistory',err);
      },
    })
  }
 
}
 
 