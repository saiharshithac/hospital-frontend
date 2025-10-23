import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'https://localhost:7270/api/person'; // Assuming controller route is /api/person

  constructor(private http: HttpClient) {}

  registerPerson(personData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/RegisterNewPerson`, personData);
  }

  validateUser(details: { username: string; password: string }): Observable<any> {
  const body = {
    email: details.username,
    password: details.password
  };
  return this.http.post<any>(`${this.apiUrl}/login`, body);
}

  getAllPersons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetAllPersons`);
  }

  getPersonById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updatePerson(id: number, personData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/UpdatePerson`, personData);
  }
getPersonDetailsByRole(role: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/GetByRole`, {
    params: { role }
  });
}

  getCountByRole(role: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Count/${role}`);
  }
}