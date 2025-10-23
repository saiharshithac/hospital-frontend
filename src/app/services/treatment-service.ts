import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  private apiUrl = 'https://localhost:7270/api/createTreatment';
  constructor(private http : HttpClient){}
 
  createTreatment(treatmentData :any){
      const url = `${this.apiUrl}?DoctorId=${treatmentData.DoctorId}&PatientId=${treatmentData.PatientId}&Dtype=${treatmentData.Dtype}&Description=${treatmentData.Description}&Prescription=${treatmentData.Prescription}&FollowUp=${treatmentData.FollowUp}`;
      return this.http.post(url,null);
    }
}
 