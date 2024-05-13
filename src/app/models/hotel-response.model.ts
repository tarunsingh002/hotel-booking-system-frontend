import {Hotel} from './hotel.model';

export class HotelResponse {
  constructor(
    public hotels: Hotel[],
    public pageNumber: number,
    public pageSize: number,
    public totalElements: number,
    public totalPages: number,
    public lastPage: boolean
  ) {}
}
