import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification-service';
import { Header } from '../../header/header';

@Component({
  selector: 'app-appointment-notifications',
  standalone: true,
  imports: [CommonModule,Header],
  templateUrl: './appointment-notifications.html',
  styleUrl: './appointment-notifications.css',
})
export class AppointmentNotifications implements OnInit {
  notifications: any = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    const personId = '1';
    this.notificationService.getNotifications(personId).subscribe({
      
      next: (data) => {
        this.notifications = data; 
        console.log('Received notifications:', data);
      },
      error: (err) => console.error('Error fetching notifications:', err),
    });
  }
}
