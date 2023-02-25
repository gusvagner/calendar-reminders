import { Reminder } from "../interfaces/reminder";

export class Day {
  public number: number;
  public isCurrentDay: boolean;
  public hasReminder: boolean;
  public reminder: Reminder | undefined;
}
