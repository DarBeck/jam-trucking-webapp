import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Maintenance } from 'src/app/models/maintenance';
import { MaintenanceService } from 'src/app/services/maintenance.service';

@Component({
  selector: 'app-maintenances',
  templateUrl: './maintenances.component.html',
  styleUrls: ['./maintenances.component.scss'],
})
export class MaintenancesComponent implements OnInit {
  selectOption: number = 10;
  maintenances: Maintenance[] = [];
  maintenancesFilter: Maintenance[] = [];
  ColumnMode = ColumnMode;
  maintenancesLoading: boolean = true;
  constructor(private maintenanceService: MaintenanceService) {}

  ngOnInit(): void {
    this.maintenanceService.GetMaintenances().subscribe((data) => {
      this.maintenances = data;
      this.maintenancesFilter = data;
      this.maintenancesLoading = false;
    });
  }
}
