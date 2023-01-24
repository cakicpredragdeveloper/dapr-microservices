export type EmployeeModel = {
  EmployeeId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  JobTitle: string;
};

export type LogModel = {
  WorkingTime: string;
  OnDay: string;
  EntryTimestamp: string;
  ExitTimestamp: string;
  EmployeeId: string;
};

export default interface IDatabaseService {
  getEmployees(): Promise<EmployeeModel[]>;
  getLogs(): Promise<LogModel[]>;
}
