import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Option, fuelTypes, truckTypes } from 'src/app/data/global-data';
import { AddTruckDto } from 'src/app/models/truck';
import { TruckService } from 'src/app/services/truck.service';

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.scss'],
})
export class AddTruckComponent {
  addTruckForm: UntypedFormGroup;
  loading: boolean = false;
  truckTypes = truckTypes;
  fuelTypes = fuelTypes;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private truckService: TruckService,
    private toastr: ToastrService
  ) {
    this.addTruckForm = this.formBuilder.group({
      license: ['', Validators.required],
      make: [''],
      color: [''],
      model: [''],
      engineSize: [null],
      maxCapacity: [null],
      year: [new Date().getFullYear(), Validators.required],
      rentalPrice: [0, [Validators.required, Validators.min(1)]],
      type: [null, Validators.required],
      wheelNum: [null],
      fuelType: [null],
      maxHeight: [null],
      seatCap: [null],
    });
  }

  get f() {
    return this.addTruckForm.controls;
  }

  onSubmit(): void {
    this.loading = true;

    var dto: AddTruckDto = {
      type: this.f['type'].value,
      make: this.f['make'].value,
      color: this.f['color'].value,
      model: this.f['model'].value,
      engineSize: this.f['engineSize'].value,
      maxCapacity: this.f['maxCapacity'].value,
      year: this.f['year'].value,
      rentalPrice: this.f['rentalPrice'].value,
      maxHeight: this.f['maxHeight'].value,
      seatCap: this.f['seatCap'].value,
      wheelNum: this.f['wheelNum'].value,
      fuelType: this.f['fuelType'].value,
      license: this.f['license'].value,
    };

    this.truckService.AddTruck(dto).subscribe(
      (response) => {
        if (response.status == 200) {
          this.toastr.success(
            `Truck ${dto.license} was entered successfully`,
            'Success!',
            {
              progressBar: true,
              toastClass: 'toast ngx-toastr',
              closeButton: true,
            }
          );

          this.addTruckForm.reset();
        }

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
