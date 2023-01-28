export type EmployeeDTO = {
  EmployeeId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  JobTitle: string;
};

export default interface IEmployeeDataSource {
  getEmployee(employeeId: string): Promise<EmployeeDTO>;
  getEmployees(): Promise<EmployeeDTO[]>;
}
