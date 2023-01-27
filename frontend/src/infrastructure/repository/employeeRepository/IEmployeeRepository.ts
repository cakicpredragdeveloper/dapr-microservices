import Employee from "../../../domain/modules/employee/entity/Employee";

export default interface IEmployeeRepository {
  getEmployee(employeeId: string): Promise<Employee>;
  getEmployees(): Promise<Employee[]>;
}
