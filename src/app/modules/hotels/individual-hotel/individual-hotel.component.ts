import {Component, OnInit} from '@angular/core';
import {Hotel} from '../../../models/hotel.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth-services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {BookingCart} from '../../../models/bookingCart.model';
import {BookingCartService} from '../../../services/bookingCart.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-individual-hotel',
  templateUrl: './individual-hotel.component.html',
  styleUrls: ['./individual-hotel.component.css'],
})
export class IndividualHotelComponent implements OnInit {
  hotel: Hotel;
  webmaster = false;
  auth = false;
  userSub: Subscription;
  totalAmount: number;
  reactiveForm: FormGroup;
  today: string;
  minToDate: string;

  constructor(
    private aroute: ActivatedRoute,
    private authS: AuthService,
    private bCartService: BookingCartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.aroute.queryParams.pipe;
    this.hotel = this.aroute.snapshot.data['res'];
    this.totalAmount = this.hotel.price;

    this.userSub = this.authS.User.subscribe((user) => {
      if (!!user) {
        this.webmaster = user.webmaster;
        this.auth = true;
      } else {
        this.webmaster = false;
        this.auth = false;
      }
    });

    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    let tomorrow = formatDate(new Date(Date.now() + 86400000), 'yyyy-MM-dd', 'en');

    this.minToDate = tomorrow;

    this.reactiveForm = new FormGroup({
      dates: new FormGroup(
        {
          fromDate: new FormControl(this.today),
          toDate: new FormControl(tomorrow),
        },
        {validators: this.dateValidators}
      ),
      quantity: new FormControl(1),
    });

    this.reactiveForm.valueChanges.subscribe((values) => {
      let from = new Date(values.dates.fromDate).getTime();
      let minTo = new Date(values.dates.fromDate).getTime() + 86400000;
      this.minToDate = formatDate(new Date(minTo), 'yyyy-MM-dd', 'en');
      let to = new Date(values.dates.toDate).getTime();

      if (to < minTo) {
        this.reactiveForm.patchValue({
          dates: {toDate: this.minToDate},
        });
        to = minTo;
      }
      let days = Math.round(Math.abs((to - from) / 86400000));
      this.totalAmount = days * this.hotel.price * values.quantity;
    });
  }

  onSubmit(rf: FormGroup) {
    if (!this.auth || this.webmaster) {
      this.authS.logout();
      this.router.navigate(['/auth']);
      return;
    }

    let bookingCart = new BookingCart(
      this.hotel,
      rf.value.quantity,
      new Date(rf.value.dates.fromDate).getTime(),
      new Date(rf.value.dates.toDate).getTime(),
      this.totalAmount
    );

    this.bCartService.addToBookingCart(bookingCart);
    this.router.navigate(['/payment']);
  }

  dateValidators(group: FormGroup) {
    let from = group.controls['fromDate'].value;
    let to = group.controls['toDate'].value;
    if (new Date(from).getTime() < new Date(formatDate(new Date(), 'yyyy-MM-dd', 'en')).getTime())
      return {
        dates: "From Date should not be less than today's date",
      };
    else if (new Date(to).getTime() <= new Date(from).getTime())
      return {
        dates: 'To Date should be more than from Date',
      };
    return null;
  }
}
