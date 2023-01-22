import { Response } from "express";

export type LogModel = {
  WorkingTime: string;
  EntryTimestamp: string;
  ExitTimestamp: string;
  EmployeeId: string;
};

export default interface Service {
  insertWorkingHours(employees: LogModel[], res: Response): Promise<string>;
}
