import Employee from "../../../domain/modules/employee/entity/Employee";

export default interface IEmployeeRepository {
  getEmployees(): Promise<Employee[]>;
}
