import { Injectable } from "@angular/core";

import { User } from "../../models/user.model";
import { HttpClient } from "@angular/common/http";
import { BookingCart } from "../../models/bookingCart.model";
import { apiUrl } from "src/app/apiutility";
import { Booking } from "src/app/models/booking.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  users: User[] = [];

  constructor(private http: HttpClient) {}

  createBooking(bookingCart: BookingCart) {
    return this.http.post<Booking>(
      `${apiUrl}/api/v1/user/createbooking`,
      bookingCart
    );
  }

  loadUserBookings() {
    return this.http.get<Booking[]>(`${apiUrl}/api/v1/user/getuserbookings`);
  }

  getAllBookings() {
    return this.http.get<Booking[]>(`${apiUrl}/api/v1/admin/getallbookings`);
  }

  getBookingsById(id: number) {
    return this.http.get<Booking>(`${apiUrl}/api/v1/admin/getbooking/${id}`);
  }
}
