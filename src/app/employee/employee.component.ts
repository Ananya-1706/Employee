import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-employee',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  animations: [
    trigger('fabAnimation', [
      transition(':enter', [
        query('.fab-btn', [
          style({ opacity: 0, transform: 'scale(0.8)' }),
          stagger(100, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ])
      ])
    ])
  ]
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
   onReset() {
  this.employeeForm.reset();
}

    onExit() {
  alert('Exit clicked');
  
}

  }
