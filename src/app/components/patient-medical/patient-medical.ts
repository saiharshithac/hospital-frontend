import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Header } from "../../header/header";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-medical',
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './patient-medical.html',
  styleUrl: './patient-medical.css'
})
export class PatientMedical {

  formData = {
    patientId: '',
    dtype: '',
    records: ''
  };
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.formData.patientId = params['id'] || '';
    });
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Medical history submitted:', this.formData);
      form.resetForm();
    }
  }

}
