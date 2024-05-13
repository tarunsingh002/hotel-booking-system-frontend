import {Hotel} from './hotel.model';

export class BookingCart {
  constructor(
    public hotel: Hotel,
    public roomsQuantity: number,
    public fromDate: number,
    public toDate: number,
    public totalAmount: number
  ) {}
}
