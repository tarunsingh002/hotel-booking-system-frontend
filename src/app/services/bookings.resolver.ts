import {Injectable} from '@angular/core';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, concat, of} from 'rxjs';
import {AuthService} from './auth-services/auth.service';
import {UserService} from './auth-services/user.service';
import {LoadingService} from './loading.service';
import {HotelDataService} from './hotel-data.service';
import {BookingsService} from './bookings.service';
import {BookingCartService} from './bookingCart.service';
import {exhaustMap, tap} from 'rxjs/operators';
import {BookingCart} from '../models/bookingCart.model';
import {User} from '../models/user.model';
import {Booking} from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingsResolver implements Resolve<{user: User; res: any[]}> {
  constructor(
    private aservice: AuthService,
    private uservice: UserService,
    private l: LoadingService,
    private hservice: HotelDataService,
    private bservice: BookingsService,
    private cartservice: BookingCartService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{user: User; res: any[]}> {
    this.l.isLoading.next(true);

    let displayBookings = [];

    return this.hservice.getHotels().pipe(
      exhaustMap(() => {
        return this.aservice.User.pipe(
          exhaustMap((user) => {
            if (user) {
              return this.uservice.loadUserBookings().pipe(
                exhaustMap((res: Booking[]) => {
                  if (res) {
                    res.forEach((r) => {
                      displayBookings.push({
                        hotel: r.hotel,
                        toDate: new Date(r.toDate).toDateString(),
                        fromDate: new Date(r.fromDate).toDateString(),
                        createdDate: new Date(r.createdDate).toDateString(),
                        roomsQuantity: r.roomsQuantity,
                        totalAmount: r.totalAmount,
                        id: r.id,
                      });
                    });
                    this.l.isLoading.next(false);
                    return of({
                      user: user,
                      res: displayBookings,
                    });
                  } else {
                    this.l.isLoading.next(false);
                    return of({user: user, res: []});
                  }
                })
              );
            } else {
              this.l.isLoading.next(false);
              return of({user: null, res: []});
            }
          })
        );
      })
    );
  }
}
