import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ApexChartOptions } from 'src/app/models/global';
import { CompanyOverview, CompanyRevenue, TruckRevenue } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  private $warning = '#FF9F43';
  unassignedMechanics: number = 0;
  invoicesPastDue: number = 0;
  upcomingRentals: number = 0;
  upcomingMaintenances: number = 0;
  companyRevenue: CompanyRevenue[] = [];
  truckRevenue: TruckRevenue[] = [];

  companyOverview: CompanyOverview | null = null;
  barChartLabels: string[] = [];
  monthlyRevenue: number[] = Array.from({ length: 6 }, () => 0);
  profitChart: ApexChartOptions;
  revenueChart = {
    chartType: 'bar',
    datasets: [
      {
        data: this.monthlyRevenue,
        backgroundColor: Array.from({ length: 6 }, () =>
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

    this.reportService.GetUnassignedMechanics().subscribe((data) => {
      this.unassignedMechanics = data?.count;
    });

    this.reportService.GetUpcomingRentals().subscribe((data) => {
      this.upcomingRentals = data?.count;
    });

    this.reportService.GetPastDueInvoices().subscribe((data) => {
      this.invoicesPastDue = data?.count;
    });

    this.reportService.GetUpcomingMaintenances().subscribe((data) => {
      this.upcomingMaintenances = data?.count;
    });

    const since = new Date();
    const until = new Date(since);
    until.setMonth(until.getMonth() - 5);

    for (let i = 5; i >= 0; i--) {
      const date = new Date(since);
      date.setMonth(since.getMonth() - i);
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      if (year !== since.getFullYear()) {
        this.barChartLabels.push(`${month} ${year}`);
      } else {
        this.barChartLabels.push(`${month}`);
      }
    }

    this.reportService
      .GetCompanyRevenue(since.toISOString(), until.toISOString())
      .subscribe((data) => {
        this.companyRevenue = data;
        const today = new Date();
        for (const item of data) {
          const itemDate = new Date(item.year, item.month - 1); // Subtract 1 from month to match JavaScript Date object
          const monthsAgo =
            (today.getMonth() -
              itemDate.getMonth() +
              12 * (today.getFullYear() - itemDate.getFullYear())) %
            12;

          if (monthsAgo < 6) {
            this.monthlyRevenue[5 - monthsAgo] = item.total;
          }
        }

        this.chart?.update();
      });

    this.reportService
      .GetTruckRevenue(since.toISOString(), until.toISOString())
      .subscribe((data) => {
        this.truckRevenue = data;
      });
  }

  generateRandomColor() {
    return '#' + (Math.random().toString(16) + '000000').slice(2, 8);
  }
}
