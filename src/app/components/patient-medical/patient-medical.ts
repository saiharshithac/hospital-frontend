import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient-service';
import { Header } from "../../header/header";

@Component({
  selector: 'app-patient-medical',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './patient-medical.html',
  styleUrl: './patient-medical.css'
})
export class PatientMedical {
  formData = {
    patientId: '',
    dtype: '',
    tid:3,

  };

  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private patientService: PatientService,private router:Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.formData.patientId = params['id'] || '';
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(form: any) {
    if (form.valid && this.selectedFile) {
      this.patientService.updateMedicalHistory(Number(this.formData.patientId), this.formData.dtype, this.selectedFile,this.formData.tid)
        .subscribe({
          next: (res) => {
            console.log('Medical history submitted successfully', res);
            alert('Medical history uploaded successfully!');
            this.router.navigate(['/login']);
            form.resetForm();
            this.selectedFile = null;
          },
          error: (err) => {
            console.error('Error submitting medical history', err);
            alert('Failed to upload medical history.');
          }
        });
    } else {
      alert('Please fill all required fields and select a file.');
    }
  }
}
