import { ApexAxisChartSeries, ApexChart, ApexStroke, ApexTooltip, ApexDataLabels, ApexFill } from "ng-apexcharts";

export interface ApexChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  colors: string[];
}
