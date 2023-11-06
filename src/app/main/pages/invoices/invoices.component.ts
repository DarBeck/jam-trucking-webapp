import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent {
  invoiceQueryForm: UntypedFormGroup;
  invoices: Invoice[] = [];
  loading: boolean = false;
  selectOption: number = 10;
  ColumnMode = ColumnMode;
  invoicesLoading: boolean = true;

  constructor(
    private invoiceService: InvoiceService,
    private formBuilder: FormBuilder
  ) {
    this.invoiceQueryForm = this.formBuilder.group({
      since: ['', Validators.required],
      until: ['', Validators.required],
    });
  }

  get f() {
    return this.invoiceQueryForm.controls;
  }

  onSearch(): void {
    if (this.invoiceQueryForm.invalid) {
      return;
    }
    this.invoicesLoading = true;

    var since = this.f['since'].value;
    var until = this.f['until'].value;

    this.invoiceService.QueryInvoices(since, until).subscribe((data) => {
      this.invoices = data;
      this.invoicesLoading = false;
    });
  }
}
