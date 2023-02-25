import { Day } from "./day";

export class Calendar {
  public currentMonthName: string;
  public currentYear: number;
  public weeks: any[] = [];
  public daysOfWeek: Day[] = [];
  public daysOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
}
