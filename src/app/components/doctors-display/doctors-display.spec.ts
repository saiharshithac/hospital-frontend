import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsDisplay } from './doctors-display';

describe('DoctorsDisplay', () => {
  let component: DoctorsDisplay;
  let fixture: ComponentFixture<DoctorsDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
