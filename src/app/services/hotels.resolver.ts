import {Injectable} from '@angular/core';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {LoadingService} from './loading.service';
import {HotelDataService} from './hotel-data.service';
import {tap} from 'rxjs/operators';
import {Hotel} from '../models/hotel.model';
import {HotelResponse} from '../models/hotel-response.model';

@Injectable({
  providedIn: 'root',
})
export class HotelsResolver implements Resolve<HotelResponse> {
  constructor(private l: LoadingService, private hdata: HotelDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HotelResponse> {
    this.l.isLoading.next(true);

    return this.hdata.getHotels(1).pipe(
      tap(() => {
        this.l.isLoading.next(false);
      })
    );
  }
}
