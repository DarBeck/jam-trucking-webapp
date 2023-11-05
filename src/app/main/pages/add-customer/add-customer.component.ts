import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { genders, maritalStatuses, parishes } from 'src/app/data/global-data';
import { AddCustomerDto, UserDetails } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent {
  addCustomerForm: UntypedFormGroup;
  loading: boolean = false;
  states = parishes;
  genders = genders;
  maritalStatuses = maritalStatuses;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    private customerService: CustomerService
  ) {
    this.addCustomerForm = this.formBuilder.group({
      trn: [null, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [null],
      dob: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: [null, Validators.required],
      zip: [''],
      maritalStatus: [null],
      phoneNumber: [''],
    });
  }

  get f() {
    return this.addCustomerForm.controls;
  }

  onSubmit(): void {
    this.loading = true;

    let userDeatils: UserDetails = {
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      gender: this.f['gender'].value,
      dob: this.f['dob'].value,
      street: this.f['street'].value,
      city: this.f['city'].value,
      state: this.f['state'].value,
      zip: this.f['zip'].value,
    };

    var dto: AddCustomerDto = {
      trn: this.f['trn'].value,
      phoneNumber: this.f['phoneNumber'].value,
      maritalStatus: this.f['maritalStatus'].value,
      userDetails: userDeatils,
    };

    this.customerService.AddCustomer(dto).subscribe(
      (response) => {
        if (response.status == 200) {
          this.toastr.success(
            `${dto.userDetails.firstName} ${dto.userDetails.lastName} was entered successfully`,
            'Success!',
            {
              progressBar: true,
              toastClass: 'toast ngx-toastr',
              closeButton: true,
            }
          );

          this.addCustomerForm.reset();
        }

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
