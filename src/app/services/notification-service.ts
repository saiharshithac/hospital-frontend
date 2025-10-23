import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'https://localhost:7270/api/getNotificationsByPersonId'; 

  constructor(private http: HttpClient) {}

  getNotifications(personId: number): Observable<any> {
  const url = `${this.apiUrl}/${personId}`;
  return this.http.get<any>(url);
}

}
