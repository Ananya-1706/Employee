import { Component } from '@angular/core';
import { EmployeeComponent } from './employee/employee.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmployeeComponent],
  template: '<app-employee></app-employee>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-app';
}