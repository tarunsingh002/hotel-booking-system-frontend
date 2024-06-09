import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from 'src/app/services/auth-services/auth.guard';
import {CompleteComponent} from './complete/complete.component';
import {AboutusComponent} from './aboutus/aboutus.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {FormsModule} from '@angular/forms';
import {FeedbackComponent} from './feedback/feedback.component';
import {FeedbackRecordedComponent} from './feedback-recorded/feedback-recorded.component';

const routes: Routes = [
  {
    path: 'complete',
    component: CompleteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contactus',
    component: ContactUsComponent,
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'recorded',
    component: FeedbackRecordedComponent,
  },
];

@NgModule({
  declarations: [
    CompleteComponent,
    ContactUsComponent,
    AboutusComponent,
    FeedbackComponent,
    FeedbackRecordedComponent,
  ],
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
})
export class MiscellaneousModule {}
