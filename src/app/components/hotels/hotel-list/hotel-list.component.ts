import {Component, OnDestroy, OnInit} from '@angular/core';
import {Hotel} from '../../../models/hotel.model';
import {Subscription} from 'rxjs';

import {HotelDataService} from '../../../services/hotel-data.service';
import {AuthService} from '../../../services/auth-services/auth.service';
import {Router} from '@angular/router';
import {BookingCartService} from '../../../services/bookingCart.service';
import {BookingCart} from '../../../models/bookingCart.model';
import {formatDate} from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, map, max, mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
})
export class HotelListComponent implements OnInit, OnDestroy {
  hotels: Hotel[] = [];
  auth: boolean = false;

  webmaster: boolean = false;
  reactiveForm: FormGroup;
  sub: Subscription;
  reactiveForm1: FormGroup;
  rForm: FormGroup;
  rForm1: FormGroup;

  sorting: boolean;
  searching: boolean;
  filtering: boolean;
  pageChange: boolean;

  isLast: boolean;
  currentPage: number;
  searchTerm = '';
  sortBy = 'hotelId';
  direction = 'asc';
  pages: number[] = [];

  locations = [
    'Gurugram',
    'Noida',
    'Chandigarh',
    'Indore',
    'Vadodara',
    'Bhubaneswar',
    'Jodhpur',
    'Ujjain',
  ];
  amenities = [
    'Balcony',
    'King Sized Bed',
    'Free Refreshments',
    'Free Breakfast',
    'Swimming Pool',
    'Gym',
    'Spa',
    'Parking',
  ];

  locationfilter = [];
  amenityfilter = [];

  rForm2: FormGroup;
  prices = ['All', '<= Rs.4999', 'Rs.5000 - Rs.9999', 'Rs.10000 - Rs.19999', '>= Rs.20000'];

  minPrice: number = -1;
  maxPrice: number = -1;

  constructor(
    private hdata: HotelDataService,
    private authS: AuthService,
    private router: Router,
    private cartService: BookingCartService
  ) {}

  ngOnInit(): void {
    this.sub = this.hdata.HotelsResponseChanged.pipe(
      mergeMap((hotelResponse) =>
        this.authS.User.pipe(
          map((user) => {
            if (hotelResponse.hotels) {
              this.hotels = hotelResponse.hotels;
              this.pages = [];
              for (let i = 0; i < hotelResponse.totalPages; i++) this.pages.push(i + 1);
              this.isLast = hotelResponse.lastPage;
              this.currentPage = hotelResponse.pageNumber + 1;
            }
            this.auth = !!user;
            if (user) this.webmaster = user.webmaster;
            return;
          })
        )
      )
    ).subscribe();

    this.reactiveForm = new FormGroup({search: new FormControl(null)});
    this.reactiveForm.valueChanges
      .pipe(
        tap(() => {
          this.searching = true;
        }),
        debounceTime(1500)
      )
      .subscribe((value: {search: string}) => {
        this.searchTerm = value.search.trim();
        this.hdata
          .getHotels(
            1,
            this.searchTerm,
            this.sortBy,
            this.direction,
            this.locationfilter,
            this.amenityfilter,
            this.minPrice,
            this.maxPrice
          )
          .subscribe(() => {
            this.searching = false;
          });
      });

    this.reactiveForm1 = new FormGroup({
      sortby: new FormControl('0'),
    });

    this.reactiveForm1.get('sortby').valueChanges.subscribe((sortBy: string) => {
      console.log(sortBy);
      this.sorting = true;
      switch (+sortBy) {
        case 0:
          this.sortBy = 'hotelId';
          this.direction = 'asc';
          break;

        case 1:
          this.sortBy = 'price';
          this.direction = 'desc';
          break;

        case 2:
          this.sortBy = 'price';
          this.direction = 'asc';
          break;

        case 3:
          this.sortBy = 'name';
          this.direction = 'asc';
          break;

        case 4:
          this.sortBy = 'name';
          this.direction = 'desc';
          break;
      }
      this.hdata
        .getHotels(
          1,
          this.searchTerm,
          this.sortBy,
          this.direction,
          this.locationfilter,
          this.amenityfilter,
          this.minPrice,
          this.maxPrice
        )
        .subscribe(() => {
          this.sorting = false;
        });
    });

    this.rForm = new FormGroup({
      location1: new FormControl(false),
      location2: new FormControl(false),
      location3: new FormControl(false),
      location4: new FormControl(false),
      location5: new FormControl(false),
      location6: new FormControl(false),
      location7: new FormControl(false),
      location8: new FormControl(false),
    });

    this.rForm.valueChanges.subscribe((locationsboolean) => {
      // console.log(brandsboolean);
      this.filtering = true;

      let i = 0;
      this.locationfilter = [];

      for (const key in locationsboolean) {
        if (locationsboolean.hasOwnProperty(key)) {
          if (locationsboolean[key]) {
            this.locationfilter.push(this.locations[i]);
          }
          i++;
        }
      }

      this.hdata
        .getHotels(
          1,
          this.searchTerm,
          this.sortBy,
          this.direction,
          this.locationfilter,
          this.amenityfilter,
          this.minPrice,
          this.maxPrice
        )
        .subscribe(() => {
          this.filtering = false;
        });
    });

    this.rForm1 = new FormGroup({
      amenity1: new FormControl(false),
      amenity2: new FormControl(false),
      amenity3: new FormControl(false),
      amenity4: new FormControl(false),
      amenity5: new FormControl(false),
      amenity6: new FormControl(false),
      amenity7: new FormControl(false),
      amenity8: new FormControl(false),
    });

    this.rForm1.valueChanges.subscribe((amenitiesboolean) => {
      // console.log(values);
      this.filtering = true;

      let i = 0;
      this.amenityfilter = [];

      for (const key in amenitiesboolean) {
        if (amenitiesboolean.hasOwnProperty(key)) {
          if (amenitiesboolean[key]) {
            this.amenityfilter.push(this.amenities[i]);
          }
          i++;
        }
      }

      this.hdata
        .getHotels(
          1,
          this.searchTerm,
          this.sortBy,
          this.direction,
          this.locationfilter,
          this.amenityfilter,
          this.minPrice,
          this.maxPrice
        )
        .subscribe(() => {
          this.filtering = false;
        });
    });

    this.rForm2 = new FormGroup({
      filterbyprice: new FormControl('All'),
    });

    this.rForm2.get('filterbyprice').valueChanges.subscribe((pricefilter) => {
      // console.log(pricefilter);
      this.minPrice = -1;
      this.maxPrice = -1;
      this.filtering = true;
      switch (pricefilter) {
        case '<= Rs.4999':
          this.maxPrice = 4999;
          console.log(this.maxPrice);
          break;
        case 'Rs.5000 - Rs.9999':
          this.minPrice = 5000;
          this.maxPrice = 9999;
          break;
        case 'Rs.10000 - Rs.19999':
          this.minPrice = 10000;
          this.maxPrice = 19999;
          break;
        case '>= Rs.20000':
          this.minPrice = 20000;
          break;
      }

      this.hdata
        .getHotels(
          1,
          this.searchTerm,
          this.sortBy,
          this.direction,
          this.locationfilter,
          this.amenityfilter,
          this.minPrice,
          this.maxPrice
        )
        .subscribe(() => {
          this.filtering = false;
        });
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this hotel ?'))
      this.hdata.deleteHotel(id).subscribe((res) => {
        if (res === 'Hotel deleted') {
          this.hdata
            .getHotels(
              this.currentPage,
              this.searchTerm,
              this.sortBy,
              this.direction,
              this.locationfilter,
              this.amenityfilter,
              this.minPrice,
              this.maxPrice
            )
            .subscribe();
        }
      });
  }

  bookNow(hotel: Hotel) {
    let today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    let tomorrow = formatDate(new Date(Date.now() + 86400000), 'yyyy-MM-dd', 'en');

    let booking = new BookingCart(
      hotel,
      1,
      new Date(today).getTime(),
      new Date(tomorrow).getTime(),
      hotel.price
    );

    this.cartService.addToBookingCart(booking);
    this.router.navigate(['/payment']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goToPage(
    page: number,
    searchTerm: string,
    sortBy: string,
    direction: string,
    locationfilter: any[],
    amenityfilter: any[],
    minPrice: number,
    maxPrice: number
  ) {
    // console.log(page);
    this.pageChange = true;
    this.hdata
      .getHotels(
        page,
        searchTerm,
        sortBy,
        direction,
        locationfilter,
        amenityfilter,
        minPrice,
        maxPrice
      )
      .subscribe(() => {
        this.pageChange = false;
      });
  }
}
