import { Injectable } from '@angular/core';
import { Reminder } from 'src/app/shared/interfaces/reminder';
import { Calendar } from 'src/app/shared/models/calendar';
import { Day } from 'src/app/shared/models/day';
import { monthNames } from 'src/app/shared/constants/monthNames';


@Injectable({
  providedIn: 'root'
})

export class CalendarUtilsService {

  private currentDate = new Date();
  private currentYear = this.currentDate.getFullYear();
  private currentMonth = this.currentDate.getMonth();
  private numberOfDaysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
  private weeks: any[] = [];
  private daysOfWeek = new Array<Day>();

  constructor() { }

  getCalendarData(): Calendar {
    this.createCalendar();
    const calendar = new Calendar();
    calendar.currentMonthName = this.getMonthName();
    calendar.currentYear = this.getCurrentYear();
    calendar.weeks = this.getWeeks();
    calendar.daysOfWeek = this.getDaysOfWeek();
    return calendar;
  }

  private createCalendar() {
    for (let day = 1; day <= this.numberOfDaysInMonth; day++) {
      let date = new Date(this.currentYear, this.currentMonth, day);
      if (this.daysOfWeek.length === 0) {
        for (let i = 0; i < date.getDay(); i++) {
          this.daysOfWeek.push(this.createDay(0));
        }
      }
      this.daysOfWeek.push(this.createDay(date.getDate()));
      if (date.getDay() === 6 || day === this.numberOfDaysInMonth) {
        this.weeks.push(this.daysOfWeek);
        if (this.daysOfWeek.length < 7) {
          for (let index = this.daysOfWeek.length; index < 7; index++) {
            this.daysOfWeek.push(this.createDay(0));
          }
        }
        this.daysOfWeek = [];
      }
    }
  }

  private createDay(dayNumber: number): Day {
    let day = new Day();
    day.number = dayNumber;
    day.isCurrentDay = this.currentDate.getDate() === dayNumber;
    day.hasReminder = false;
    return day
  }

  private getDayFromWeeks(weeks: any[], date: Date): Day | undefined {
    for (let week of weeks) {
      for (let day of week) {
        if (day.number === this.getDayFromDate(date))
          return day;
      }
    }
    return undefined;
  }

  private editCalendarReminderDate(reminder: Reminder, oldDate: Date) {
    this.deleteCalendarReminder(oldDate);
    this.addCalendarReminder(reminder);
  }

  private getDayFromDate(date: any): number {
    return Number(date.substr(date.length - 2));
  }

  getMonthName() {
    return monthNames[this.currentMonth];
  }

  getCurrentYear(): number {
    return this.currentYear;
  }

  getWeeks(): number[] {
    return this.weeks;
  }

  getDaysOfWeek(): Day[] {
    return this.daysOfWeek;
  }

  addCalendarReminder(reminder: Reminder) {
    let day = this.getDayFromWeeks(this.weeks, reminder.date);
    if (day) {
      day.reminder = reminder;
      day.hasReminder = true;
    }
  }

  deleteCalendarReminder(reminderDate: Date) {
    let day = this.getDayFromWeeks(this.weeks, reminderDate);
    if (day) {
      day.reminder = undefined;
      day.hasReminder = false;
    }
  }

  editCalendarReminder(reminder: Reminder, oldDate: Date) {
    if (reminder.date !== oldDate) {
      this.editCalendarReminderDate(reminder, oldDate);
      return;
    }
    let day = this.getDayFromWeeks(this.weeks, reminder.date);
    if (day) {
      day.reminder = reminder;
    }
  }

}
