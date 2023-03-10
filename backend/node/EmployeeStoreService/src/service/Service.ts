export type LogModel = {
  WorkingTime: string;
  EntryTimestamp: string;
  ExitTimestamp: string;
  EmployeeId: string;
};

export default interface Service {
  insertWorkingHours(employees: LogModel[]): Promise<string>;
}
