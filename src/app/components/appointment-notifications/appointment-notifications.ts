import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-notifications.html',
  styleUrl: './appointment-notifications.css',
})
export class AppointmentNotifications implements OnInit {
  personId: number | null = null;
  notifications: any = null;

  constructor(
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const storedId = localStorage.getItem('personId');
    const parsedId = storedId !== null ? Number(storedId) : null;
    this.personId = parsedId !== null && !isNaN(parsedId) ? parsedId : null;
    console.log('Appointment Notifications personId:', this.personId);

    if (this.personId !== null) {
      this.notificationService.getNotifications(this.personId).subscribe({
        next: (data) => {
          this.notifications = data.$values.reverse();
          console.log('Received notifications:', data);
        },
        error: (err) => console.error('Error fetching notifications:', err),
      });
    }
  });
}
}
