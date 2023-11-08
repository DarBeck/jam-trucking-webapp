import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Invoice, PayInvoiceDto } from 'src/app/models/invoice';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { RentalService } from 'src/app/services/rental.service';
import { NotificationService } from 'src/app/utilities/notification.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  paymentForm: UntypedFormGroup;
  invoiceData: Invoice | null = null;
  rentalData: Rental | null = null;
  customerData: Customer | null = null;
  invoiceId: number = 0;
  numberOfDays: number = 0;
  subTotal: number = 0;
  total: number = 0;
  loading: boolean = false;

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private customerService: CustomerService,
    private formBuilder: UntypedFormBuilder,
    private notifyService: NotificationService
  ) {
    this.paymentForm = this.formBuilder.group({
      paymentDate: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.invoiceId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.invoiceService.GetInvoice(this.invoiceId).subscribe((data) => {
      this.invoiceData = data;
      if (data != null) {
        this.rentalService.GetRental(data.rentalId).subscribe((rentalData) => {

          if (rentalData != null) {
            this.customerService.GetCustomer(rentalData?.customerId).subscribe((customerData) => {
              this.customerData = customerData;
            });
          }
          this.rentalData = rentalData;

          const date1 = new Date(rentalData.dateOfRent);
          const date2 = new Date(rentalData.dateOfReturn);

          const timeDifference = date2.getTime() - date1.getTime();

          const daysDifference = timeDifference / (1000 * 3600 * 24);
          this.numberOfDays = daysDifference;
          this.subTotal = daysDifference * rentalData.price;
          this.total = this.subTotal * 1.15;

        });
      }
    });
  }

  get f() {
    return this.paymentForm.controls;
  }

  onSubmit(): void {
    this.loading = true;
    let dto: PayInvoiceDto = {
      paymentDate: this.f['paymentDate'].value,
      invoiceId: this.invoiceId,
    };

    this.invoiceService.PayInvoice(dto).subscribe((response) => {
      if (response.status == 200) {
        this.notifyService.showSuccess(
          `Invoice was paid successfully`,
          'Success!'
        );
        
        this.invoiceData!.status = 'Paid';
      }

      this.loading = false;
    });

  }
}
