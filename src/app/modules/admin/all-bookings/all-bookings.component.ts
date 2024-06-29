import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Hotel} from 'src/app/models/hotel.model';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css'],
})
export class AllBookingsComponent implements OnInit {
  displayBookings: {
    hotel: Hotel;
    roomsQuantity: number;
    fromDate: string;
    toDate: string;
    totalAmount: number;
    id: number;
    createdDate: string;
  }[] = [];

  earnings: number;

  constructor(private aroute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.displayBookings = this.aroute.snapshot.data['res2'].bookings;
    this.earnings = this.aroute.snapshot.data['res2'].earnings;
    console.log(this.displayBookings);
  }

  bookingDetailsPage(booking) {
    this.router.navigate([`/admin/bookingdetail/${booking.id}`]);
  }
}
