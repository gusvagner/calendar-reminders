import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarService } from 'src/app/calendar/services/calendar.service';
import { Reminder } from 'src/app/shared/interfaces/reminder';
import { Weather } from 'src/app/shared/models/weather';
import { WeatherService } from '../services/weather.service';
import { DeleteWarningComponent } from '../warnings/delete-warning/delete-warning.component';
import { SameDayWarningComponent } from '../warnings/same-day-warning/same-day-warning.component';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent implements OnInit {

  reminderForm: FormGroup;
  submitted = false;
  updating = false;
  minDate: string;
  maxDate: string;
  weather = new Weather();
  weatherChecked = false;
  errorMessage: string;
  error = false;

  constructor(
    private dialogRef: MatDialogRef<ReminderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reminder,
    private formBuilder: FormBuilder,
    private calendarService: CalendarService,
    private weatherService: WeatherService,
    public dialog: MatDialog) {
    this.initForm();
    this.configureDatePicker();
  }

  ngOnInit(): void {
    if (this.checkIfIsUpdating())
      this.reminderForm.setValue(this.data);
    this.submitted = false;
  }

  initForm() {
    this.reminderForm = this.formBuilder.group({
      id: [0],
      text: [null, [Validators.required, Validators.maxLength(30)]],
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
      city: [null, [Validators.required]]
    });
  }

  get text() { return this.reminderForm.get('text'); }
  get date() { return this.reminderForm.get('date'); }
  get city() { return this.reminderForm.get('city'); }

  saveReminder() {
    if (this.calendarService.existReminderOnSameDay(this.reminderForm.value)) {
      this.openSameDayWarning();
      return;
    }
    this.submitted = true;
    if (this.reminderForm.valid) {
      this.calendarService.create(this.reminderForm.value);
      this.close();
    }
  }

  editReminder() {
    this.submitted = true;
    if (this.reminderForm.valid) {
      this.calendarService.edit(this.reminderForm.value);
      this.close();
    }
  }

  close() {
    this.reminderForm.reset();
    this.dialogRef.close();
  }

  checkIfIsUpdating(): boolean {
    if (this.data !== undefined) {
      this.updating = true;
      return true;
    }
    this.updating = false;
    return false;
  }

  deleteReminder() {
    this.calendarService.delete(this.reminderForm.value);
    this.close();
  }

  configureDatePicker() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.minDate = firstDayOfMonth.toISOString().substring(0, 10);
    this.maxDate = lastDayOfMonth.toISOString().substring(0, 10);
  }

  openSameDayWarning() {
    this.dialog.open(SameDayWarningComponent);
  }

  deleteWarning() {
    const dialogRef = this.dialog.open(DeleteWarningComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteReminder();
    });
  }

  checkWeather() {
    this.configureWeatherValues();
    this.weatherService.getWeatherInformation(this.reminderForm.value['city'])?.subscribe(result => {
      this.weatherChecked = true;
      this.weather = result.weather[0];
      this.weather.temperature = result.main.temp;
      this.weather.feelsLike = result.main.feels_like;
      this.weather.maxTemperature = result.main.temp_max;
      this.weather.minTemperature = result.main.temp_min;
    }, (error) => {
      [this.weatherChecked, this.error] = [true, true];
      this.errorMessage = error.error.message;
    });
  }

  getPageTitle(): string {
    if (this.updating) return 'Update Reminder';
    return 'New Reminder';
  }

  configureWeatherValues() {
    [this.weatherChecked, this.error] = [false, false];
    this.errorMessage = "";
  }


}
