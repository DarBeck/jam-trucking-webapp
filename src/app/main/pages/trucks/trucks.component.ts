import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Truck } from 'src/app/models/truck';

@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.scss'],
})
export class TrucksComponent implements OnInit {
  selectOption: number = 10;
  trucks: Truck[] = [];
  trucksFilter: Truck[] = [];
  ColumnMode = ColumnMode;
  trucksLoading: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
