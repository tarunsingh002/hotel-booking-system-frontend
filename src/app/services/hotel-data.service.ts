import { Injectable } from "@angular/core";
import { Hotel } from "../models/hotel.model";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { HotelService } from "./hotel.service";
import { apiUrl } from "../apiutility";

@Injectable({
  providedIn: "root",
})
export class HotelDataService {
  constructor(private http: HttpClient, private hservice: HotelService) {}

  addHotel(h: Hotel) {
    return this.http.post<Hotel>(`${apiUrl}/api/v1/admin/createhotel`, h);
  }

  getHotels() {
    return this.http.get<Hotel[]>(`${apiUrl}/api/v1/all/getallhotels`).pipe(
      tap((res) => {
        this.hservice.addHotels(res);
      })
    );
  }

  deleteHotel(id: number) {
    return this.http.delete(`${apiUrl}/api/v1/admin/deletehotel/${id}`, {
      responseType: "text",
    });
  }

  updateHotel(id: number, hotel: Hotel) {
    return this.http.put(`${apiUrl}/api/v1/admin/updatehotel/${id}`, hotel);
  }
}
