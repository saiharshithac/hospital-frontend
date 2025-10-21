import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentNotifications } from './appointment-notifications';

describe('AppointmentNotifications', () => {
  let component: AppointmentNotifications;
  let fixture: ComponentFixture<AppointmentNotifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentNotifications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentNotifications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
