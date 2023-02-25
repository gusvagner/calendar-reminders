import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarService } from 'src/app/calendar/services/calendar.service';
import { WeatherService } from '../services/weather.service';

import { ReminderFormComponent } from './reminder-form.component';

describe('ReminderFormComponent', () => {
  let component: ReminderFormComponent;
  let fixture: ComponentFixture<ReminderFormComponent>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<ReminderFormComponent>>;
  let calendarService: CalendarService;

  beforeEach(async () => {
    weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getWeatherInformation']);
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    calendarService = jasmine.createSpyObj('CalendarService', ['create']);

    await TestBed.configureTestingModule({
      declarations: [ReminderFormComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        FormBuilder,
        CalendarService,
        { provide: WeatherService, useValue: weatherServiceSpy },
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            id: 123,
            text: 'a'.repeat(30),
            date: new Date(),
            time: '12:00',
            city: 'London'
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    calendarService = TestBed.inject(CalendarService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate max length of the text field', () => {
    component.reminderForm.controls['text'].setValue('a'.repeat(32));
    expect(component.text?.status).toBe('INVALID');
    component.reminderForm.controls['text'].setValue('a'.repeat(30));
    expect(component.text?.status).toBe('VALID');
  });


  it('should call create() if the form is valid', () => {
    spyOn(calendarService, 'create');
    component.submitted = true;
    component.saveReminder();
    expect(calendarService.create).toHaveBeenCalled();
  });

  it('should not call create() from CalendarService if the form is invalid', () => {
    spyOn(calendarService, 'create');
    component.reminderForm.reset();
    component.saveReminder();
    expect(calendarService.create).not.toHaveBeenCalled();
  });

});
