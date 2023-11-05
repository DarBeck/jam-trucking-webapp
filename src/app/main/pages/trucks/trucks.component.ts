import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Truck } from 'src/app/models/truck';
import { TruckService } from 'src/app/services/truck.service';

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

  constructor(private truckService: TruckService) {}

  ngOnInit(): void {
    this.truckService.GetTrucks().subscribe((data) => {
         this.trucks = data;
         this.trucksFilter = data;
         this.trucksLoading = false;
    })
  }
}
