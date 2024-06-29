import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllBookingsComponent} from './all-bookings/all-bookings.component';
import {RouterModule, Routes} from '@angular/router';
import {IsWebmasterGuard} from 'src/app/services/auth-services/is-webmaster.guard';
import {BookingDetailComponent} from './booking-detail/booking-detail.component';
import {AllBookingsResolver} from 'src/app/services/all-bookings.resolver';

const routes: Routes = [
  {
    path: 'allbookings',
    component: AllBookingsComponent,
    resolve: {res2: AllBookingsResolver},
    canActivate: [IsWebmasterGuard],
  },
  {
    path: 'bookingdetail/:id',
    component: BookingDetailComponent,
    resolve: {res2: AllBookingsResolver},
    canActivate: [IsWebmasterGuard],
  },
];

@NgModule({
  declarations: [AllBookingsComponent, BookingDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
