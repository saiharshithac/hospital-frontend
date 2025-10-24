import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor-service';
import { PersonService } from '../../services/person-service';
import { CommonModule } from '@angular/common';
import { Header } from "../../header/header";
import { Footer } from "../../footer/footer";

@Component({
  selector: 'app-doctors-display',
  imports: [CommonModule, Header, Footer],
  templateUrl: './doctors-display.html',
  styleUrl: './doctors-display.css'
})
export class DoctorsDisplay {

  doctors:any[]=[];
  constructor(private personService:PersonService){
    this.personService.getPersonDetailsByRole('Doctor').subscribe({
      next:(data)=>{
        this.doctors=data.$values;
        console.log('Doctors data loaded:',this.doctors);
      },
      error:(error)=>{
        console.error('Error loading doctors data:',error);
      }
    });

}
}
