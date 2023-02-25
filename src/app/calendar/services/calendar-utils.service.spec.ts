import { TestBed } from '@angular/core/testing';

import { CalendarUtilsService } from './calendar-utils.service';

describe('CalendarUtilsService', () => {
  let service: CalendarUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
