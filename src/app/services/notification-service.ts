import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'https://localhost:7270/api/Notification/getAllNotifications'; // Replace with your actual URL

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
