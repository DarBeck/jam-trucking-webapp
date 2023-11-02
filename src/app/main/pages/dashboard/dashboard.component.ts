import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  barChartLabels = ['July', 'August', 'September', 'October', 'November'];
  revenueChart = {
    chartType: 'bar',
    datasets: [
      {
        data: [560004, 672222, 673889, 988776, 1588899],
        backgroundColor: this.barChartLabels.map(() =>
          this.generateRandomColor()
        ),
      },
    ],
    labels: this.barChartLabels,
    options: {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Months', // Label for the x-axis
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Revenue ($)', // Label for the y-axis
          },
        },
      },
    },
    legend: false,
  };

  constructor() {}

  ngOnInit(): void {}

  generateRandomColor() {
    return '#' + (Math.random().toString(16) + '000000').slice(2, 8);
  }
}
