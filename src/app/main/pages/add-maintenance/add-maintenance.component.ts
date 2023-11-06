import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { maintenanceTypes, priorities, skillLevels } from 'src/app/data/global-data';
import { Employee } from 'src/app/models/employee';
import { AddMaintenanceDto } from 'src/app/models/maintenance';
import { Truck } from 'src/app/models/truck';
import { EmployeeService } from 'src/app/services/employee.service';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { TruckService } from 'src/app/services/truck.service';
import { NotificationService } from 'src/app/utilities/notification.service';

@Component({
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.scss'],
})
export class AddMaintenanceComponent implements OnInit {
  addMaintenanceForm: UntypedFormGroup;
  loading: boolean = false;
  employees: Employee[] = [];
  employeesLoading: boolean = true;
  trucks: Truck[] = [];
  trucksLoading: boolean = true;
  skillLevels = skillLevels;
  maintenanceTypes = maintenanceTypes;
  priorities = priorities;

  constructor(
    private truckService: TruckService,
    private employeeService: EmployeeService,
    private formBuilder: UntypedFormBuilder,
    private notifyService: NotificationService,
    private maintenanceService: MaintenanceService
  ) {
    this.addMaintenanceForm = this.formBuilder.group({
      mechanicId: [null, Validators.required],
      truckId: [null, Validators.required],
      serviceDate: [null, Validators.required],
      type: [null, Validators.required],
      minimumSkillLevelRequired: [null, Validators.required],
      description: [''],
      cost: [0, Validators.required],
      priority: ['Medium', Validators.required],
    });
  }

  ngOnInit(): void {
    this.employeeService.GetEmployees().subscribe((data) => {
      this.employees = data.filter(i => i.role == 'Mechanic').map((i) => {
        i.fullName = i.firstName + ' ' + i.lastName;
        return i;
      });
      this.employeesLoading = false;
    });

    this.truckService.GetTrucks().subscribe((data) => {
      this.trucks = data;
      this.trucksLoading = false;
    });
  }

  get f() {
    return this.addMaintenanceForm.controls;
  }

  onSubmit(): void {
    this.loading = true;

    var dto: AddMaintenanceDto = {
      mechanicId: this.f['mechanicId'].value,
      truckId: this.f['truckId'].value,
      description: this.f['description'].value,
      cost: this.f['cost'].value,
      type: this.f['type'].value,
      priority: this.f['priority'].value,
      minimumSkillLevelRequired: this.f['minimumSkillLevelRequired'].value,
      serviceDate: this.f['serviceDate'].value,
    };

    this.maintenanceService.AddMaintenance(dto).subscribe(
      (response) => {
        if (response.status == 200) {
          this.notifyService.showSuccess(
            `Maintenance was entered successfully`,
            'Success!'
          );

          this.addMaintenanceForm.reset();
        }

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
