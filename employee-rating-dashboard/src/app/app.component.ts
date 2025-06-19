import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClient,HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
   standalone: true,
   imports: [CommonModule,FormsModule, NgxChartsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  employeeName: string = '';
  showChart = false;
  data: any[] = [];

    colorScheme: any = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };
  
    

  barChartData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadEmployeeNameAndData();
  }

  loadEmployeeNameAndData() {
    // 🔄 Step 1: Fetch logged-in employee's name from backend
    this.http.get<{ name: string }>('http://localhost:8080/rating').subscribe({
      next: (res) => {
        this.employeeName = res.name;
        this.loadRatingData();
      },
      error: (err) => {
        console.error('❌ Error fetching user name:', err);
        alert('Could not load current user. Please check your session or login.');
      }
    });
  }

  loadRatingData() {
    // 🔄 Step 2: Fetch rating data for the employee
    this.http.get<any[]>(`http://localhost:8080/rating/${this.employeeName}`).subscribe({
      next: (response) => {
        this.data = response;
        this.generateChartData();
        this.showChart = true;
      },
      error: (err) => {
        console.error('❌ Failed to fetch rating data:', err);
        alert('Failed to fetch rating data for employee.');
      },
    });
  }

  

  generateChartData() {
    const managerAData = this.data.map(d => d.managerA);
    const managerBData = this.data.map(d => d.managerB);

    const avgA = +(managerAData.reduce((a, b) => a + b) / managerAData.length).toFixed(2);
    const avgB = +(managerBData.reduce((a, b) => a + b) / managerBData.length).toFixed(2);

    this.barChartData = [
      {
        name: 'Manager A',
        series: [
          ...this.data.map(d => ({ name: d.parameter, value: d.managerA })),
          { name: 'Average', value: avgA }
        ]
      },
      {
        name: 'Manager B',
        series: [
          ...this.data.map(d => ({ name: d.parameter, value: d.managerB })),
          { name: 'Average', value: avgB }
        ]
      }
    ];
  }
}
