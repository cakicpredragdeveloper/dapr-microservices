import Employee from "../entity/Employee";

export default interface IGetEmployeesGateway {
  getEmployees(): Promise<Employee[]>;
}
