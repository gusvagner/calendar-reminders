import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { SharedModule } from '../shared/shared/shared.module';
import { ReminderFormModule } from '../reminder-form/reminder-form.module';


@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    ReminderFormModule,
  ]
})
export class CalendarModule { }
