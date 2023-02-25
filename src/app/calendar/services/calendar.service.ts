import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reminder } from 'src/app/shared/interfaces/reminder';
import { CalendarUtilsService } from './calendar-utils.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  reminders: Reminder[] = [];

  constructor(private calendarUtilsService: CalendarUtilsService) { }

  create(data: Reminder): Reminder {
    data.id = this.generateId();
    this.reminders.push(data);
    this.calendarUtilsService.addCalendarReminder(data);
    return data;
  }

  edit(data: Reminder): boolean {
    let index = this.getIndex(data.id);
    if (index !== -1) {
      let oldReminder = this.getReminderById(data.id);
      let oldDate = new Date();
      if (oldReminder)
        oldDate = oldReminder.date;
      this.reminders[index] = data;
      this.calendarUtilsService.editCalendarReminder(data, oldDate);
      return true;
    }
    return false;
  }

  list(date: Date): Observable<Reminder[]> {
    return of(this.reminders);
  }

  delete(data: Reminder): boolean {
    let index = this.getIndex(data.id);
    if (index !== -1) {
      this.reminders.splice(index, 1);
      this.calendarUtilsService.deleteCalendarReminder(data.date);
      return true;
    }
    return false;
  }

  existReminderOnSameDay(data: Reminder): boolean {
    let index = this.reminders.findIndex(item => item.date === data.date);
    if (index !== -1) return true;
    return false;
  }

  getReminderById(reminderId: number): Reminder | undefined {
    return this.reminders.find(x => x.id === reminderId);
  }

  private generateId(): number {
    let now = new Date();
    let id = `${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
    return Number(id);
  }

  private getIndex(id: number): number {
    return this.reminders.findIndex(item => item.id === id);
  }

}
