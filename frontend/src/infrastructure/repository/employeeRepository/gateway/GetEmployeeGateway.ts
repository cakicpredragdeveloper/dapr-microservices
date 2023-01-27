import Employee from "../../../../domain/modules/employee/entity/Employee";
import IGetEmployeeGateway from "../../../../domain/modules/employee/gateway/IGetEmployeeGateway";
import Log from "../../../../domain/modules/logDomain/entity/Log";
import ILogRepository from "../../logRepository/ILogRepository";
import IEmployeeRepository from "../IEmployeeRepository";

export class GetEmployeesGatewayError extends Error {
  constructor(message: string) {
    super(`[GetEmployeesGateway] Error - ${message}`);
  }
}

export default class GetEmployeeGateway implements IGetEmployeeGateway {
  constructor(private _employeeRepository: IEmployeeRepository, private _logRepository: ILogRepository) {}

  public async getEmployee(employeeId: string): Promise<Employee> {
    try {
      return await this._employeeRepository.getEmployee(employeeId);
    } catch (err: any) {
      throw new GetEmployeesGatewayError(err.message);
    }
  }

  public async getEmployeeLogs(employeeId: string): Promise<Log[]> {
    try {
      return await this._logRepository.getEmployeeLogs(employeeId);
    } catch (err: any) {
      throw new GetEmployeesGatewayError(err.message);
    }
  }
}
