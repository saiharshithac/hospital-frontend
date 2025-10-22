import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css',
})
export class DoctorDashboard implements OnInit {

  activeSection: string = 'appointments';
  patients: any = null;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService.getPersonDetailsByRole('Patient').subscribe({
      next: (data) => {
        this.patients = data;
        console.log('Received patients:', data);
      },
      error: (err) => console.error('Error fetching patients:', err),
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
