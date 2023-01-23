export type EmployeeDTO = {
  EmployeeId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  JobTitle: string;
};

export default interface IEmployeeDataSource {
  getEmployees(): Promise<EmployeeDTO[]>;
}
