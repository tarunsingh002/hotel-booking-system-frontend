import {Injectable} from '@angular/core';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Hotel} from '../models/hotel.model';
import {LoadingService} from './loading.service';
import {HotelDataService} from './hotel-data.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HotelResolver implements Resolve<Hotel> {
  constructor(private l: LoadingService, private dservice: HotelDataService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Hotel> {
    this.l.isLoading.next(true);
    return this.dservice.getHotelById(+route.url[0].path).pipe(
      tap(() => {
        this.l.isLoading.next(false);
      })
    );
  }
}
