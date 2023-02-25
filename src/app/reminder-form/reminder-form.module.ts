import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderFormComponent } from './reminder-form/reminder-form.component';
import { DeleteWarningComponent } from './warnings/delete-warning/delete-warning.component';
import { SameDayWarningComponent } from './warnings/same-day-warning/same-day-warning.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared/shared.module';


@NgModule({
  declarations: [
    ReminderFormComponent,
    DeleteWarningComponent,
    SameDayWarningComponent
  ],
  exports: [ReminderFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ReminderFormModule { }
