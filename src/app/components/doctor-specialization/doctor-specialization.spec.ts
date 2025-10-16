import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSpecialization } from './doctor-specialization';

describe('DoctorSpecialization', () => {
  let component: DoctorSpecialization;
  let fixture: ComponentFixture<DoctorSpecialization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorSpecialization]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorSpecialization);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
