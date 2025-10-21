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
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        console.log('Received notifications:', data);
        this.notifications = data?.$values ?? []; 
      },
      error: (err) => console.error('Error fetching notifications:', err),
    });
  }
}
