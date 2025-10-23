import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from "../../header/header";
import { PersonService } from '../../services/person-service';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeslotService } from '../../services/timeslot-service';
import { DoctorService } from '../../services/doctor-service';
import { AppointmentService } from '../../services/appointment-service';
import { App } from '../../app';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule, Header], 
  templateUrl: './appointment.html',
  styleUrl: './appointment.css'
})
export class Appointment implements OnInit{
  minDate: string = '';
  selectedDate: string = this.minDate;
  selectedTime: string = '';  

  personid: number | null = null;
  doctor: any = null;
  doctors: any = null;
  timeSlots: any;
  patientId: number | null = null;

  constructor(
  private personService: PersonService,
  private doctorService: DoctorService,
  private timeslotService: TimeslotService,
  private appointmentService: AppointmentService,
  private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void{
    this.minDate = new Date().toISOString().split('T')[0];
    this.route.queryParams.subscribe(params => {
      this.personid = params['personid'] ? Number(params['personid']) : null;
      console.log('Received personid:', this.personid);

      const storedId = localStorage.getItem('personId');
    const parsedId = storedId !== null ? Number(storedId) : null;
    this.patientId = parsedId !== null && !isNaN(parsedId) ? parsedId : null;
    
      if (this.personid !== null) {
        this.loadPersonDetails(this.personid);
        this.loadDoctorDetails(this.personid);
        this.loadTimeSlotDetails();
      }
      
    });
  }
  loadDoctorDetails(id: number) {
    this.doctorService.GetDoctorByPersonId(id).subscribe({
      next: (data) => {
        this.doctors = data;
        console.log('Doctor loaded:',data);
      },
      error: (err) => {
        console.error('Error loading doctor');
      }
    });
  }

  loadPersonDetails(id: number) {
  this.personService.getPersonById(id).subscribe({
    next: (data) => {
      this.doctor = data;
      console.log('Person loaded:', data);
    },
    error: (err) => {
      console.error('Error loading doctor:', err);
    }
  });
  }

  loadTimeSlotDetails() {
    this.timeslotService.getAllTimeslots().subscribe((res:any)=>{
      this.timeSlots = res;
      console.log('Time slots loaded:', res);
    });
}
  selectTime(timeSlotId: string | number) {
    // store both a string for UI and a numeric id for API calls
    this.selectedTime = String(timeSlotId);
    console.log('Selected time slot ID:', this.selectedTime);
  }
  confirmAppointment() {
      if (!this.selectedDate || !this.selectedTime) {
        alert('Please select a date and slot for the appointment.');
        return;
      }

      if (this.selectedTime == null || this.personid == null || this.doctors?.personId == null) {
        alert('Missing required appointment details. Please select a doctor, patient and a time slot.');
        return;
      }

      const appointmentData = {
        timeSlotId : this.selectedTime,
        appointmentDate : this.selectedDate,
        personId : this.patientId,
        doctorId : this.doctors.personId,
        status : 'Scheduled'
      }
      console.log('Appointment Data:', appointmentData);

      this.appointmentService.createAppointments( 
        this.selectedTime, 
        this.selectedDate,
        this.doctors.personId,
        this.patientId!,
        'Scheduled'
      ).subscribe({
        next: (response: any) => {
          console.log('Appointment created successfully:', response);
          alert('Appointment booked successfully!');
        },
        error: (error: any) => {
          console.error('Error creating appointment:', error);
          alert('Failed to book appointment. Please try again.');
        }
      });
    
    }

}
