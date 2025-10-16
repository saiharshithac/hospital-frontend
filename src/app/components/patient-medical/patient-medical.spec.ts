import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedical } from './patient-medical';

describe('PatientMedical', () => {
  let component: PatientMedical;
  let fixture: ComponentFixture<PatientMedical>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedical]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedical);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
