import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class MedicalHistory {
  private apiUrl = 'https://localhost:7270/api/Medical/DisplayMedicalHistory'
  constructor(private http :HttpClient){}
  GetMedicalHistory(personId : any){
    const url = `${this.apiUrl}?PatientId=${personId}`;
    return this.http.get(url,{ responseType: 'blob' })
  }
}
 