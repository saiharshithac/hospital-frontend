import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private patientService: PatientService) {}

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
      // const tid = this.formData.tid !== 0 ? this.formData.tid : null;
      console.log('Submitting medical history for Patient ID:', this.formData.patientId);
      console.log('Document Type:', this.formData.dtype);
      console.log('Selected File:', this.selectedFile);
      console.log('Tid:', this.formData.tid);
      console.log('Form Data:', this.formData);
      this.patientService.updateMedicalHistory(Number(this.formData.patientId), this.formData.dtype, this.selectedFile,this.formData.tid)
        .subscribe({
          next: (res) => {
            console.log('Medical history submitted successfully', res);
            alert('Medical history uploaded successfully!');
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
