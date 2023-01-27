import Log from "../../logDomain/entity/Log";
import Employee from "../entity/Employee";

export default interface IGetEmployeeGateway {
  getEmployee(employeeId: string): Promise<Employee>;
  getEmployeeLogs(employeeId: string): Promise<Log[]>;
}
