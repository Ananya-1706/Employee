import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employeeForm: FormGroup;
  departments = ['IT', 'HR', 'Finance', 'Operations', 'Marketing'];
  employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary'];

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeEmail: ['', [Validators.required, Validators.email]],
      projectManagerName: ['', Validators.required],
      projectStartDate: ['', Validators.required],
      department: ['', Validators.required],
      employmentType: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('Form submitted:', this.employeeForm.value);
      alert('Form submitted successfully!');
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }
}