import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'https://localhost:7270/api/Medical';

  constructor(private http: HttpClient) {}

 updateMedicalHistory(patientId: number, dtype: string, file: File, tid: number | null) {

  const formData = new FormData();
 
  // ✅ Match property names exactly

  formData.append('PatientId', patientId.toString());

  formData.append('Dtype', dtype);

  if (tid !== null) {

    formData.append('Tid', tid.toString());

  }
 
  // ✅ Add CreatedAt in ISO format

  formData.append('createdAt', new Date().toISOString());
  formData.append('records',file.name);
 
  // ✅ Match 'File' exactly (not 'file')

  formData.append('File', file, file.name);
 
  return this.http.post(`${this.apiUrl}/AddMedicalHistory`, formData);

}

 
}