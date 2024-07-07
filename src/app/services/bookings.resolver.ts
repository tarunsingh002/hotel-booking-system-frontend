import {Injectable} from '@angular/core';
import {RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth-services/auth.service';
import {UserService} from './auth-services/user.service';
import {LoadingService} from './loading.service';
import {switchMap} from 'rxjs/operators';

import {User} from '../models/user.model';
import {Booking} from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingsResolver {
  constructor(
    private aservice: AuthService,
    private uservice: UserService,
    private l: LoadingService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.l.isLoading.next(true);

    let displayBookings = [];

    return this.aservice.User.pipe(
      switchMap((user) => {
        if (user) {
          return this.uservice.loadUserBookings().pipe(
            switchMap((res: Booking[]) => {
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
  }
}
