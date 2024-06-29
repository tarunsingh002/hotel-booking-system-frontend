import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {Hotel} from 'src/app/models/hotel.model';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css'],
})
export class BookingDetailComponent implements OnInit {
  displayBookings: {
    hotel: Hotel;
    roomsQuantity: number;
    fromDate: string;
    toDate: string;
    totalAmount: number;
    id: number;
    createdDate: string;
  }[] = [];

  displayBooking: {
    hotel: Hotel;
    roomsQuantity: number;
    fromDate: string;
    toDate: string;
    totalAmount: number;
    id: number;
    createdDate: string;
  };

  constructor(private aroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.aroute.params
      .pipe(
        map((params) => {
          this.displayBookings = this.aroute.snapshot.data['res2'].bookings;
          this.displayBooking = this.displayBookings.find((b) => b.id === +params['id']);
        })
      )
      .subscribe();
  }
}
