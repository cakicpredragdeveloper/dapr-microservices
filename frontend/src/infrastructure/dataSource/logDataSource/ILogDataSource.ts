export type LogDTO = {
  WorkingTime: string;
  EntryTimestamp: string;
  ExitTimestamp: string;
  EmployeeId: string;
};

export default interface ILogDataSource {
  getLogs(): Promise<LogDTO[]>;
  getEmployeeLogs(employeeId: string): Promise<LogDTO[]>;
}
