import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  GetAppointmentsByPersonId(personId: number) {
    return this.http.get(
      `${this.apiUrl}/Appointment/getAppointmentsByPersonId/${personId}`
    );
  }
//   updateAppointmentStatus(appointmentId: number, status: string) {
//   return this.http.put(`${this.apiUrl}/Appointment/updateStatus/${appointmentId}?status=${status}`, null);
// }
cancelAppointment(appointmentId: number) {
  return this.http.put(`${this.apiUrl}/Appointment/cancelAppointment/${appointmentId}`, null);
}
}
