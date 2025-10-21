import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Appointment } from './appointment';
import { Header } from '../../header/header';

describe('Appointment', () => {
  let component: Appointment;
  let fixture: ComponentFixture<Appointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Appointment,Header]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Appointment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
