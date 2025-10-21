import { Routes } from '@angular/router';
import { App } from './app';

import { RegisterForm } from './components/register-form/register-form';
import { DoctorSpecialization } from './components/doctor-specialization/doctor-specialization';
import { PatientMedical } from './components/patient-medical/patient-medical';
import { UpdateProfile } from './components/update-profile/update-profile';
import { Header } from './header/header';
import { DoctorsDisplay } from './components/doctors-display/doctors-display';
import { Homepage } from './components/homepage/homepage';
import { Aboutus } from './components/aboutus/aboutus';
import { AppointmentNotifications } from './components/appointment-notifications/appointment-notifications';

export const routes: Routes = [
  {
    path: 'doctor',
    component: DoctorSpecialization,
  },

  {
    path: 'doctor-display',
    component: DoctorsDisplay,
  },

  {
    path: 'register',
    component: RegisterForm,
  },
  {
    path: 'patient',
    component: PatientMedical,
  },
  {
    path: 'update',
    component: UpdateProfile,
  },
  {
    path: '',
    component: Header,
  },
  {
    path: 'homepage',
    component: Homepage,
  },
  {
    path: 'aboutus',
    component: Aboutus,
  },
  {
    path: 'appointment-notifications',
    component: AppointmentNotifications,
  },
];
