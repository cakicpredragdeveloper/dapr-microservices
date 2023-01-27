import Employee from "../../../domain/modules/employee/entity/Employee";
import IEmployeeDataSource from "../../dataSource/employeeDataSource/IEmployeeDataSource";
import IEmployeeMapperFactory from "./factory/IEmployeeMapperFactory";
import IEmployeeRepository from "./IEmployeeRepository";

export class EmployeeRepositoryError extends Error {
  constructor(message: string) {
    super(`[EmployeeRepository] Error - ${message}`);
  }
}

export default class EmployeeRepository implements IEmployeeRepository {
  constructor(private _dataSource: IEmployeeDataSource, private _mapperFactory: IEmployeeMapperFactory) {}

  async getEmployee(employeeId: string): Promise<Employee> {
    try {
      const employee = await this._dataSource.getEmployee(employeeId);
      const employeeMap = this._mapperFactory.getEmployeeMapper().map(employee);

      return employeeMap;
    } catch (error: any) {
      throw new EmployeeRepositoryError(`[getEmployees] - ${error.message}`);
    }
  }

  async getEmployees(): Promise<Employee[]> {
    try {
      const employees = await this._dataSource.getEmployees();
      const employeesMap = employees.map((employeeData) => this._mapperFactory.getEmployeeMapper().map(employeeData));

      return employeesMap;
    } catch (error: any) {
      throw new EmployeeRepositoryError(`[getEmployees] - ${error.message}`);
    }
  }
}
