import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'https://localhost:7270/api/person'; 

  constructor(private http: HttpClient) {}

  registerPerson(personData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/RegisterNewPerson`, personData);
  }

  validateUser(username: string, password: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/login/validate?username=${username}&password=${password}`);
  }

  getAllPersons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetAllPersons`);
  }

  getPersonById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updatePerson(id: number, personData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdatePerson/${id}`, personData);
  }

  getPersonDetailsByRole(role: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetByRole`,
 {
    params: { role }
  }
);
  }

  // Get count by role
  getCountByRole(role: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Count/${role}`);
  }
}