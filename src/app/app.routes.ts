import { Routes } from '@angular/router';
import { App } from './app';

import { RegisterForm } from './components/register-form/register-form';
import { DoctorSpecialization } from './components/doctor-specialization/doctor-specialization';
import { PatientMedical } from './components/patient-medical/patient-medical';
import { UpdateProfile } from './components/update-profile/update-profile';
import { Header } from './header/header';
import { DoctorsDisplay } from './components/doctors-display/doctors-display';
import { Appointment } from './components/appointment/appointment';
import { Doctors } from './components/doctors/doctors';
import { Homepage } from './components/homepage/homepage';
import { Aboutus } from './components/aboutus/aboutus';
import { AppointmentNotifications } from './components/appointment-notifications/appointment-notifications';
import { Login } from './components/login/login';
import { RoleGuard } from './guards/guards/role-guard';
import { DashboardAdmin } from './components/dashboard-admin/dashboard-admin';
import { Footer } from './footer/footer';
import { DoctorDashboard } from './components/doctor-dashboard/doctor-dashboard';


export const routes: Routes = [
    {
        path: '',
        component: Homepage
    },
    {
        path: 'doctor',
        component:DoctorSpecialization,
        canActivate:[RoleGuard],
        data:{roles:['Doctor']}
        },
    
    {
        path:"doctor-display",
        component:DoctorsDisplay,
        canActivate:[RoleGuard],
        data:{roles:['Patient','Doctor']}
    },
    
    {
        path:"register",
        component:RegisterForm,
      
    },
    {
        path:"patient",
        component:PatientMedical,
        canActivate:[RoleGuard],
        data:{roles:['Patient','Doctor']}
    },
    {
        path:"update",
        component:UpdateProfile,
        canActivate:[RoleGuard],
        data:{roles:['Patient','Doctor',]}
    },
    {
        path:"appointment",
        component:Appointment,
        canActivate:[RoleGuard],
        data:{roles:['Patient']}
    },
    {
        path:"doctors",
        component:Doctors,
        canActivate:[RoleGuard],
        data:{roles:['Patient']}
    },
   
    {
        path:"homepage",
        component:Homepage,
        canActivate:[RoleGuard],
        data:{roles:['Patient','Doctor','Staff']}
    },
    {
        path:"aboutus",
        component:Aboutus,
        canActivate:[RoleGuard],
        data:{roles:['Patient','Doctor']}
    },
    {
        path:"appointment-notifications",
        component:AppointmentNotifications,
        canActivate:[RoleGuard],
        data:{roles:['Patient','Doctor']}
    },
    {
        path: 'login',
        component: Login,
        
    },
    {
        path:'dashboard-admin',
        component:DashboardAdmin,
        canActivate:[RoleGuard],
        data:{roles:['Staff']}
    },
    {
        path: 'doctor-dashboard',
        component: DoctorDashboard,
        canActivate: [RoleGuard],
        data: { roles: ['Doctor'] } 
    }
];
