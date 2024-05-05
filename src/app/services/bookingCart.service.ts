import { Injectable } from '@angular/core'
import { BookingCart } from '../models/bookingCart.model'
import { BehaviorSubject } from 'rxjs'
import { HotelService } from './hotel.service'

@Injectable({
    providedIn: 'root',
})
export class BookingCartService {
    bookingCart: BookingCart
    bookingCartChanged = new BehaviorSubject<BookingCart>(null)

    constructor(private hservice: HotelService) {}

    addToBookingCart(bcart: BookingCart) {
        this.bookingCart = bcart
        this.bookingCartChanged.next(this.bookingCart)
        localStorage.setItem('bookingCart', JSON.stringify(this.bookingCart))
    }

    displayBookingCartGetter(bcart: BookingCart) {
        let allHotels = this.hservice.getHotels()

        return {
            hotel: allHotels.find((h) => h.hotelId === bcart.hotelId),
            roomsQuantity: bcart.roomsQuantity,
            fromDate: new Date(bcart.fromDate).toDateString(),
            toDate: new Date(bcart.toDate).toDateString(),
            totalAmount: bcart.totalAmount,
        }
    }
}
