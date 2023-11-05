import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Option, truckTypes } from 'src/app/data/global-data';

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.scss'],
})
export class AddTruckComponent {
  addTruckForm: UntypedFormGroup;
  loading: boolean = false;
  truckTypes = truckTypes

  constructor(private formBuilder: UntypedFormBuilder) {
    this.addTruckForm = this.formBuilder.group({
      license: ['', Validators.required],
      make: [''],
      color: [''],
      engineSize: [null],
      maxCapacity: [null],
      year: [new Date().getFullYear(), Validators.required],
      rentalPrice: [0, [Validators.required, Validators.min(1)]],
    });
  }

  get f() {
    return this.addTruckForm.controls;
  }

  onSubmit(): void {}
}
