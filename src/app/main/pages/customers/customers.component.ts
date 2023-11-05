import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  selectOption: number = 10;
  customers: Customer[] = [];
  customersFilter: Customer[] = [];
  ColumnMode = ColumnMode;
  customersLoading: boolean = true;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.GetCustomers().subscribe((data) => {
      this.customers = data;
      this.customersFilter = data;
      this.customersLoading = false;
    });
  }
}
