import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AppComponent {
  ratings = [1, 2, 3, 4, 5];
  performanceCriteria = [
    'Communication',
    ' Punctuality',
    'problem_solving',
    ' teamwork',
   ' leadership' ,
  ];
 
  formData: any = {};
 
  onSubmit() {
    console.log('Submitted Data:', this.formData);
    // you can handle the form data here (e.g., send to backend)
  }
}
 
 