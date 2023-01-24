import NetworkController from "../../network/NetworkController";
import IEmployeeDataSource, { EmployeeDTO } from "./IEmployeeDataSource";

export class EmployeeDataSourceError extends Error {
  constructor(message: string) {
    super(`[EmployeeDataSource] Error - ${message}`);
  }
}

export default class EmployeeDataSource implements IEmployeeDataSource {
  constructor(private nwc: NetworkController) {}

  async getEmployees(): Promise<EmployeeDTO[]> {
    try {
      const employees: any = await this.nwc.request({
        url: "/database/employees",
        method: "GET",
        useToken: true
      });

      return employees.data;
    } catch (error: any) {
      throw new EmployeeDataSourceError(`[getEmployees] - ${error.message}`);
    }
  }
}
