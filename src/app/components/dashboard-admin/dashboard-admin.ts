import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../services/person-service';
import { AppointmentService } from '../../services/appointment-service';

@Component({
  selector: 'app-dashboard-admin',
  imports: [FormsModule,CommonModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css'
})
export class DashboardAdmin {
totalDoctors = 0;
totalPatients = 0;
totalAppointments = 0;
doctors:any[]=[];
patients:any[]=[];
appointments:any[]=[];
activeList: string | null = null;
showDetails:boolean=false;

 constructor(private personService:PersonService,private appointmentService:AppointmentService){}
 ngOnInit(){
  
  this.personService.getDoctorsCount().subscribe(count =>{
   this.totalDoctors=count;
  });

  this.personService.getPatientsCount().subscribe(count=>
  {
    this.totalPatients=count;
  });
  this.appointmentService.getAppointmentsCount().subscribe(count=>{
    this.totalAppointments=count;
    
  })
 }
 loadDoctors(){
  this.personService.getAllDoctors().subscribe((res:any)=>{
    console.log('api response :',res);
    const doctorsArray=res.$values || res || [];
    this.doctors=doctorsArray.map((d:any)=>({
      name:`${d.firstName + ''} ${d.lastName || ''}`.trim(),
      speciality:d.speciality,
      email:d.email,
      phoneNo:d.phoneNo
    }));
    console.log('mapped doctors: ',this.doctors)
  })
 }
  loadPatients(){
  this.personService.getAllPatients().subscribe((res:any)=>{
    console.log('api response :',res);
    const patientsArray=res.$values || res || [];
    this.patients=patientsArray.map((p:any)=>({
      name:`${p.firstName + ''} ${p.lastName || ''}`.trim(),
      email:p.email,
      phoneNo:p.phoneNo,
      address:p.address
    }));
    console.log('mapped patients: ',this.patients)
  })
 }
 loadAppointments(){
   this.appointmentService.getAllAppointments().subscribe((res:any)=>{
    console.log('api response :',res);
    const appointmentsArray=res.$values || res || [];
    this.appointments=appointmentsArray.map((a:any)=>({
      appointmentDate:a.appointmentDate,
      doctorId:a.doctorId,
      patientId:a.patientId,
      status:a.status
    }));
    console.log('mapped patients: ',this.patients)
  })

 }
 toggleDetails(){
  this.showDetails=!this.showDetails;
 }
 
 toggleList(listType: string): void {
   if(this.activeList ===listType){
    this.activeList=null;
   }
   else {
    this.activeList=listType;
    switch(listType){
      case 'doctors':
        if(this.doctors.length===0){
          this.loadDoctors();
        }
        break;
           case 'patients':
        if(this.patients.length===0){
          this.loadPatients();
        }
        break;
           case 'appointments':
        if(this.appointments.length===0){
          this.loadAppointments();
        }
        break;
    }
   }
 }
 

}
