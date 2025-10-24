import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'https://localhost:7270/api/Doctor';
  constructor(private http:HttpClient){}
  dto={
    speciality: '',
    yearsOfReg: 0
  }
  // addSpeciality(doctorId: number, specialty: string) {
  //   const url = `${this.apiUrl}/AddSpeciality/${doctorId}?specialty=${specialty}`;
  //   return this.http.post(url, null);
  // }
  addSpeciality(doctorId: number, dto: any):Observable<any> {
  const url = `${this.apiUrl}/addSpeciality/${doctorId}`;
  return this.http.post(url, dto);
  }
updateSpeciality(doctorId: number, dto: any): Observable<any> {
  // const token = localStorage.getItem('token');
  // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
 
  const url = `${this.apiUrl}/${doctorId}/updateSpeciality`;
  return this.http.put(url, dto);
}
 
  GetDoctorByPersonId(personId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetDoctorByPersonId?personid=${personId}`);
  }
 
}