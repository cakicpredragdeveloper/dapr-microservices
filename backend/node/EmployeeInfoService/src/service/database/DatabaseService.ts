import { DaprConfig } from "@app/config/types";
import { DaprClient } from "@dapr/dapr";
import ServiceError from "../ServiceError";
import IDatabaseService, { EmployeeModel } from "./IDatabaseService";

export default class DatabaseService implements IDatabaseService {
  private readonly daprClient: DaprClient;
  private readonly store = "sqldb";
  private readonly employeesTable = "employees";

  constructor({ host, port }: DaprConfig) {
    this.daprClient = new DaprClient(host, port);
  }

  async getEmployees(): Promise<EmployeeModel[]> {
    try {
      const sqlCmd = `SELECT * FROM ${this.employeesTable};`;
      const payload = `{"sql": "${sqlCmd}"} `;

      const data = (await this.daprClient.binding.send(this.store, "query", "", JSON.parse(payload))) as [];

      const employees = data.map((entry) => this.mapEmployee(entry));

      return employees;
    } catch (err: any) {
      throw new ServiceError(`[Database error]: ${err.message}`);
    }
  }

  private mapEmployee(data: any): EmployeeModel {
    return {
      EmployeeId: data[0],
      FirstName: data[1],
      LastName: data[2],
      Email: data[3],
      JobTitle: data[4]
    };
  }
}
