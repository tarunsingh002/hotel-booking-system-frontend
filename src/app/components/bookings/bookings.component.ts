import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user.model";
import { Hotel } from "../../models/hotel.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.component.html",
  styleUrls: ["./bookings.component.css"],
})
export class BookingsComponent implements OnInit {
  user: User;
  displayBookings: {
    hotel: Hotel;
    roomsQuantity: number;
    fromDate: string;
    toDate: string;
    totalAmount: number;
    id: number;
    createdDate: string;
  }[] = [];

  constructor(private aroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.user = this.aroute.snapshot.data["res2"].user;
    this.displayBookings = this.aroute.snapshot.data["res2"].res;
  }
}
