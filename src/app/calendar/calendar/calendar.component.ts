import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ReminderFormComponent } from 'src/app/reminder-form/reminder-form/reminder-form.component';
import { Reminder } from 'src/app/shared/interfaces/reminder';
import { Calendar } from 'src/app/shared/models/calendar';
import { CalendarUtilsService } from '../services/calendar-utils.service';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject<boolean>();
  calendar = new Calendar();
  reminders: Reminder[];

  constructor(
    private calendarService: CalendarService,
    private matDialog: MatDialog,
    private calendarUtilsService: CalendarUtilsService) { }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    this.initCalendar();
    this.calendarService.list(new Date())
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((reminders: Reminder[]) => {
        reminders.map((reminder: Reminder) => {
          return {
            ...reminder,
            //weather: this.getWeather(reminder.city),
          };
        });
        this.reminders = reminders;
      });
  }

  openReminderForm(reminder?: Reminder) {
    this.matDialog.open(ReminderFormComponent, {
      data: reminder
    });
  }

  initCalendar() {
    this.calendar = this.calendarUtilsService.getCalendarData();
  }

  getReminderDescriptionAndTime(reminder: Reminder): string {
    return reminder.text + ' - ' + reminder.time;
  }

}
