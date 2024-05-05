import { Hotel } from "./hotel.model";
import { UserInfo } from "./user-info.model";

export class Booking {
  constructor(
    public createdDate: number,
    public hotel: Hotel,
    public roomsQuantity: number,
    public fromDate: number,
    public toDate: number,
    public user: UserInfo,
    public totalAmount: number,
    public id?: number
  ) {}
}
