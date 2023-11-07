import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Truck } from 'src/app/models/truck';
import { TruckService } from 'src/app/services/truck.service';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss'],
})
export class TruckComponent implements OnInit {
  truckData: Truck | null = null;
  truckId: number = 0;

  constructor(
    private truckService: TruckService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.truckId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.truckService.GetTruck(this.truckId).subscribe((data) => {
      this.truckData = data;
    });
  }
}
