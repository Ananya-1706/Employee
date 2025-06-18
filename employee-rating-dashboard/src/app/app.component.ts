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


  submitName() {
    if (!this.employeeName.trim()) return;

    this.http.get<any[]>(`http://localhost:8080/employee-ratings/${this.employeeName}`)
      .subscribe({
        next: (response) => {
          console.log('📥 Data fetched from backend:', response);

          this.data = response;
          this.generateChartData();
          this.showChart = true;
        },
        error: (err) => {
          console.error('❌ Failed to fetch data:', err);
          alert('Failed to fetch employee data. Please check the backend.');
        }
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
          ...this.data.map(d => ({ name: d.month, value: d.managerA })),
          { name: 'Average', value: avgA }
        ]
      },
      {
        name: 'Manager B',
        series: [
          ...this.data.map(d => ({ name: d.month, value: d.managerB })),
          { name: 'Average', value: avgB }
        ]
      }
    ];
  }
}
