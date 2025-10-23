import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'https://localhost:7270/api';
  constructor(private http: HttpClient) {}

  createAppointments( appointmentData : any
  ) {
    const url = `${this.apiUrl}/createAppointments?TimeSlotId=${appointmentData.TimeslotId}&AppointmentDate=${appointmentData.appointmentDate}&DoctorId=${appointmentData.doctorId}&PatientId=${appointmentData.personId}&Status=${appointmentData.status}`;
    //https://localhost:7270/api/createAppointments?TimeSlotId=slot2&AppointmentDate=2025-10-31&DoctorId=5&PatientId=4&Status=Scheduled
    return this.http.post(url, null);
  }
   getAppointmentsCount():Observable<number>{
      return this.http.get<number>(`${(this.apiUrl)}/Appointment/Count`);
    }
    getAllAppointments():Observable<any[]>{
      return this.http.get<any[]>(`${(this.apiUrl)}/getAppointments`);
    }

  GetAppointmentsByPersonId(personId: number) {
    return this.http.get(
      `${this.apiUrl}/getAppointmentsByPersonId/${personId}`
    );
  }
  
  cancelledAppointment(appointmentId: any) {
    const url = `${this.apiUrl}/Appointment/cancelledAppointment/${appointmentId}`;
    return this.http.put(url,{}, { responseType: 'text' });
  }
  
  GetAppointmentsByDoctorId(doctorId: number) {
    return this.http.get(
      `${this.apiUrl}/GetAppointmentsByDoctorId?doctorId=${doctorId}`
    );
  }
}
