import { Component, OnInit } from '@angular/core';
import { ApexChartOptions } from 'src/app/models/global';
import { CompanyOverview } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private $warning = '#FF9F43';

  companyOverview: CompanyOverview | null = null;
  barChartLabels = ['July', 'August', 'September', 'October', 'November'];
  profitChart: ApexChartOptions;
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

  constructor(private reportService: ReportService) {
    this.profitChart = {
      chart: {
        height: 100,
        type: 'area',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      colors: [this.$warning],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2.5,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.9,
          opacityFrom: 0.7,
          opacityTo: 0.5,
          stops: [0, 80, 100],
        },
      },
      series: [
        {
          name: 'Profit',
          data: [10, 15, 8, 15, 7, 12, 8],
        },
      ],
      tooltip: {
        x: { show: false },
      },
    };
  }

  ngOnInit(): void {
    this.reportService.GetCompanyOverview().subscribe((data) => {
      this.companyOverview = data;
    });
  }

  generateRandomColor() {
    return '#' + (Math.random().toString(16) + '000000').slice(2, 8);
  }
}
