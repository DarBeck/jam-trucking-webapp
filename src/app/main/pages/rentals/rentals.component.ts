import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.scss'],
})
export class RentalsComponent implements OnInit {
  selectOption: number = 10;
  rentals: Rental[] = [];
  rentalsFilter: Rental[] = [];
  ColumnMode = ColumnMode;
  rentalsLoading: boolean = true;

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.rentalService.GetRentals().subscribe((data) => {
      this.rentals = data;
      this.rentalsFilter = data;
      this.rentalsLoading = false;
    });
  }
}
