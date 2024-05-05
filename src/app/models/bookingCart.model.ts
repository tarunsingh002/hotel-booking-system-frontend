export class BookingCart {
  constructor(
    public hotelId: number,
    public roomsQuantity: number,
    public fromDate: number,
    public toDate: number,
    public totalAmount: number
  ) {}
}
