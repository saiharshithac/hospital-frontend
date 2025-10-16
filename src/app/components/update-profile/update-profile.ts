import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from "../../header/header";
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../../services/person-service';

@Component({
  selector: 'app-update-profile',
  imports: [FormsModule, CommonModule, Header],
  templateUrl: './update-profile.html',
  styleUrl: './update-profile.css'
})
export class UpdateProfile implements OnInit{
  personId: number = 0  ;
  personData:any={};
  roleSpecificData: any = {};
  constructor(private route: ActivatedRoute,private personService:PersonService) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      
      this.personId = +params['id']; // Get ID from query params
      this.loadPersonDetails();
    });
  }
  loadPersonDetails() {
    this.personService.getPersonById(this.personId).subscribe({
      next: (data) => {
        this.personData = data;
        
this.personService.getPersonDetailsByRole(this.personData.role).subscribe({
        next: (roleData) => {
          const match = roleData.$values?.find((p: any) => p.personId === this.personId);
          this.roleSpecificData = match || {};
        }
      });

        console.log('Person data loaded:', this.personData);
      },
      error: (error) => {
        console.error('Error loading person data:', error);
      }
    });
  }
    onUpdate() {
      this.personService.updatePerson(this.personId, this.personData).subscribe({
        next: (response) => {
          console.log('Profile updated successfully', response);
          alert('Profile updated successfully');
        },
        error: (error) => {
          console.error('Error updating profile', error);
          alert('Error updating profile');
        }
      });
    }
  }

