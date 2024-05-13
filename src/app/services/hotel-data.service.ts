import {Injectable} from '@angular/core';
import {Hotel} from '../models/hotel.model';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

import {apiUrl} from '../apiutility';
import {HotelResponse} from '../models/hotel-response.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelDataService {
  api = apiUrl;
  HotelsResponseChanged = new BehaviorSubject<HotelResponse>(null);
  constructor(private http: HttpClient) {}

  addHotel(h: Hotel) {
    return this.http.post<Hotel>(`${apiUrl}/api/v1/admin/createhotel`, h);
  }

  getHotels(
    page: number,
    searchTerm = '',
    sortBy = 'hotelId',
    direction = 'asc',
    locationfilter = [],
    amenityfilter = [],
    minPrice = -1,
    maxPrice = -1
  ) {
    if (
      searchTerm !== '' ||
      locationfilter.length !== 0 ||
      amenityfilter.length !== 0 ||
      minPrice !== -1 ||
      maxPrice !== -1
    ) {
      return this.http
        .post<HotelResponse>(
          `${this.api}/api/v1/all/filterhotels?pageNumber=${
            page - 1
          }&sortBy=${sortBy}&direction=${direction}&searchTerm=${searchTerm}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
          {locations: locationfilter, amenities: amenityfilter}
        )
        .pipe(
          tap((res) => {
            // this.hservice.addHotels(res.hotels);
            this.HotelsResponseChanged.next(res);
          })
        );
    } else
      return this.http
        .get<HotelResponse>(
          `${this.api}/api/v1/all/getallhotels?pageNumber=${
            page - 1
          }&sortBy=${sortBy}&direction=${direction}`
        )
        .pipe(
          tap((res) => {
            // this.hservice.addHotels(res.hotels);
            this.HotelsResponseChanged.next(res);
          })
        );
  }

  getHotelById(id: number) {
    return this.http.get<Hotel>(`${apiUrl}/api/v1/all/gethotel/${id}`);
  }

  deleteHotel(id: number) {
    return this.http.delete(`${apiUrl}/api/v1/admin/deletehotel/${id}`, {
      responseType: 'text',
    });
  }

  updateHotel(id: number, hotel: Hotel) {
    return this.http.put(`${apiUrl}/api/v1/admin/updatehotel/${id}`, hotel);
  }
}
