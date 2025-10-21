import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeslotService {
  private apiUrl = 'https://localhost:7270/api/getTimeslots'; 

  constructor(private http: HttpClient) {}
  getAllTimeslots(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

}
