export type EmployeeModel = {
  EmployeeId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  JobTitle: string;
};

export type LogModel = {
  WorkingTime: string;
  EntryTimestamp: string;
  ExitTimestamp: string;
  EmployeeId: string;
};

export default interface IDatabaseService {
  getEmployee(employeeId: string): Promise<EmployeeModel>;
  getEmployees(): Promise<EmployeeModel[]>;
  getEmployeeLogs(employeeId: string): Promise<LogModel[]>;
  getLogs(): Promise<LogModel[]>;
}
