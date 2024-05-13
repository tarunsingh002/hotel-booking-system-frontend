import {Injectable} from '@angular/core';
import {BookingCart} from '../models/bookingCart.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingCartService {
  bookingCart: BookingCart;
  bookingCartChanged = new BehaviorSubject<BookingCart>(null);

  constructor() {}

  addToBookingCart(bcart: BookingCart) {
    this.bookingCart = bcart;
    this.bookingCartChanged.next(this.bookingCart);
    localStorage.setItem('bookingCart', JSON.stringify(this.bookingCart));
  }

  displayBookingCartGetter(bcart: BookingCart) {
    return {
      hotel: bcart.hotel,
      roomsQuantity: bcart.roomsQuantity,
      fromDate: new Date(bcart.fromDate).toDateString(),
      toDate: new Date(bcart.toDate).toDateString(),
      totalAmount: bcart.totalAmount,
    };
  }
}
