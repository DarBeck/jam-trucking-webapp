import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss'],
})
export class RentalComponent implements OnInit {
  rentalData: Rental | null = null;
  rentalId: number = 0;

  constructor(
    private rentalService: RentalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.rentalId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.rentalService.GetRental(this.rentalId).subscribe((data) => {
      this.rentalData = data;
    });
  }
}
