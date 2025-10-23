import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'https://localhost:7270/api';
  constructor(private http: HttpClient) {}

  createAppointments(
    TimeslotId: string,
    appointmentDate: string,
    doctorId: number,
    personId: number,
    status: string
  ) {
    const url = `${this.apiUrl}/createAppointments?TimeSlotId=${TimeslotId}&AppointmentDate=${appointmentDate}&DoctorId=${doctorId}&PatientId=${personId}&Status=${status}`;
    return this.http.post(url, null);
  }
   getAppointmentsCount():Observable<number>{
      return this.http.get<number>(`${(this.apiUrl)}/Appointment/Count`);
    }
    getAllAppointments():Observable<any[]>{
      return this.http.get<any[]>(`${(this.apiUrl)}/getAppointments`);
    }
}
