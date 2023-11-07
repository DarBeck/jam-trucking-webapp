import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customerData: Customer | null = null;
  customerId: number = 0;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customerId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.customerService.GetCustomer(this.customerId).subscribe((data) => {
      this.customerData = data;
    });
  }
}
