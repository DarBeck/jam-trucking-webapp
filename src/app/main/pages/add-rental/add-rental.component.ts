import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { Employee } from 'src/app/models/employee';
import { AddRentalDto } from 'src/app/models/rental';
import { Truck } from 'src/app/models/truck';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { RentalService } from 'src/app/services/rental.service';
import { TruckService } from 'src/app/services/truck.service';
import { NotificationService } from 'src/app/utilities/notification.service';

@Component({
  selector: 'app-add-rental',
  templateUrl: './add-rental.component.html',
  styleUrls: ['./add-rental.component.scss'],
})
export class AddRentalComponent implements OnInit {
  addRentalForm: UntypedFormGroup;
  loading: boolean = false;
  employees: Employee[] = [];
  employeesLoading: boolean = true;
  trucks: Truck[] = [];
  trucksLoading: boolean = true;
  customers: Customer[] = [];
  customersLoading: boolean = true;

  constructor(
    private truckService: TruckService,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private formBuilder: UntypedFormBuilder,
    private notifyService: NotificationService,
    private rentalService: RentalService
  ) {
    this.addRentalForm = this.formBuilder.group({
      employeeId: [null, Validators.required],
      customerId: [null, Validators.required],
      truckId: [null, Validators.required],
      dateOfRent: [null, Validators.required],
      dateOfReturn: [null],
    });
  }

  ngOnInit(): void {
    this.employeeService.GetEmployees().subscribe((data) => {
      this.employees = data.map((i) => {
        i.fullName = i.firstName + ' ' + i.lastName;
        return i;
      });
      this.employeesLoading = false;
    });

    this.truckService.GetTrucks().subscribe((data) => {
      this.trucks = data;
      this.trucksLoading = false;
    });

    this.customerService.GetCustomers().subscribe((data) => {
      this.customers = data.map((i) => {
        i.fullName = i.firstName + ' ' + i.lastName;
        return i;
      });
      this.customersLoading = false;
    });
  }

  get f() {
    return this.addRentalForm.controls;
  }

  onSubmit(): void {
    this.loading = true;

    var dto: AddRentalDto = {
      customerId: this.f['customerId'].value,
      employeeId: this.f['employeeId'].value,
      truckId: this.f['truckId'].value,
      dateOfRent: this.f['dateOfRent'].value,
      dateOfReturn: this.f['dateOfReturn'].value,
    };

    this.rentalService.AddRental(dto).subscribe(
      (response) => {
        if (response.status == 200) {
          this.notifyService.showSuccess(
            `Rental was entered successfully`,
            'Success!'
          );

          this.addRentalForm.reset();
        }

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
