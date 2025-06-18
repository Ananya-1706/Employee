import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
   standalone: true,
   imports: [CommonModule,FormsModule, NgxChartsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  employeeName: string = '';
  showChart = false;
    colorScheme: any = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };
  
    data = [
    { month: 'January', managerA: 3, managerB: 4 },
    { month: 'February', managerA: 4, managerB: 5 },
    { month: 'March', managerA: 5, managerB: 4 }
  ];

  barChartData: any[] = [];

  


  submitName() {
    if (!this.employeeName.trim()) return;

    this.generateChartData();
    this.showChart = true;
  }

  generateChartData() {
    const months = this.data.map(d => d.month);

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
