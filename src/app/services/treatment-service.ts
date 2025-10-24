import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  private apiUrl = 'https://localhost:7270/api';
  constructor(private http : HttpClient){}
 
  createTreatment(treatmentData :any){
      const url = `${this.apiUrl}/createTreatment?DoctorId=${treatmentData.DoctorId}&PatientId=${treatmentData.PatientId}&Dtype=${treatmentData.Dtype}&Description=${treatmentData.Description}&Prescription=${treatmentData.Prescription}&FollowUp=${treatmentData.FollowUp}`;
      return this.http.post(url,null);
    }

    getTreatment(){
      const url = `${this.apiUrl}/getAllTreatmentDone`;
      return this.http.get(url);
    }

    getTreatmentById(treatmentData : any){
      const url = `${this.apiUrl}/getTreatmentDoneById?PatientId=${treatmentData.PatientId}`;
      return this.http.get(url);
    }
}