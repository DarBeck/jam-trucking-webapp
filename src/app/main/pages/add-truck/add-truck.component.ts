import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.scss'],
})
export class AddTruckComponent {
  addTruckForm: UntypedFormGroup;
  loading: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.addTruckForm = this.formBuilder.group({
      liscense: ["", Validators.required]
    });
  }

  get f() {
    return this.addTruckForm.controls;
  }

  onSubmit(): void {}
}
