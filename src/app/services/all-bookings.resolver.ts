import {Injectable} from '@angular/core';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {LoadingService} from './loading.service';
import {UserService} from './auth-services/user.service';
import {map, tap} from 'rxjs/operators';
import {Booking} from '../models/booking.model';
import {Hotel} from '../models/hotel.model';
import {UserInfo} from '../models/user-info.model';

@Injectable({
  providedIn: 'root',
})
export class AllBookingsResolver
  implements
    Resolve<{
      bookings: {
        hotel: Hotel;
        toDate: String;
        fromDate: String;
        createdDate: String;
        roomsQuantity: number;
        totalAmount: number;
        user: UserInfo;
        id: number;
      }[];
      earnings: number;
    }>
{
  constructor(private l: LoadingService, private uservice: UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{
    bookings: {
      hotel: Hotel;
      toDate: String;
      fromDate: String;
      createdDate: String;
      roomsQuantity: number;
      totalAmount: number;
      user: UserInfo;
      id: number;
    }[];
    earnings: number;
  }> {
    this.l.isLoading.next(true);
    let earnings = 0;

    let displayBookings = [];

    return this.uservice.getAllBookings().pipe(
      map((res: Booking[]) => {
        res.forEach((r) => {
          displayBookings.push({
            hotel: r.hotel,
            toDate: new Date(r.toDate).toDateString(),
            fromDate: new Date(r.fromDate).toDateString(),
            createdDate: new Date(r.createdDate).toDateString(),
            roomsQuantity: r.roomsQuantity,
            totalAmount: r.totalAmount,
            user: r.user,
            id: r.id,
          });
          earnings = earnings + r.totalAmount;
        });

        this.l.isLoading.next(false);

        return {bookings: displayBookings, earnings: earnings};
      })
    );
  }
}
