import { DaprConfig } from "@app/config/types";
import { DaprClient } from "@dapr/dapr";
import ServiceError from "../ServiceError";
import IDatabaseService, { EmployeeModel, LogModel } from "./IDatabaseService";

export default class DatabaseService implements IDatabaseService {
  private readonly daprClient: DaprClient;
  private readonly store = "sqldb";
  private readonly employeesTable = "employees";
  private readonly logsTable = "logs";

  constructor({ host, port }: DaprConfig) {
    this.daprClient = new DaprClient(host, port);
  }

  async getEmployee(employeeId: string): Promise<EmployeeModel> {
    try {
      const sqlCmd = `SELECT * FROM ${this.employeesTable} WHERE employeeid LIKE '${employeeId}';`;
      const payload = `{"sql": "${sqlCmd}"} `;

      const data = (await this.daprClient.binding.send(this.store, "query", "", JSON.parse(payload))) as [];

      const employee = data.map((entry) => this.mapEmployee(entry));

      return employee[0];
    } catch (err: any) {
      throw new ServiceError(`[Database error]: ${err.message}`);
    }
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

  async getEmployeeLogs(employeeId: string): Promise<LogModel[]> {
    try {
      const sqlCmd = `SELECT * FROM ${this.logsTable} WHERE employeeid LIKE '${employeeId}';`;
      const payload = `{"sql": "${sqlCmd}"} `;

      const data = (await this.daprClient.binding.send(this.store, "query", "", JSON.parse(payload))) as [];

      const logs = data.map((entry) => this.mapLog(entry));

      return logs;
    } catch (err: any) {
      throw new ServiceError(`[Database error]: ${err.message}`);
    }
  }

  async getLogs(): Promise<LogModel[]> {
    try {
      const sqlCmd = `SELECT * FROM ${this.logsTable};`;
      const payload = `{"sql": "${sqlCmd}"} `;

      const data = (await this.daprClient.binding.send(this.store, "query", "", JSON.parse(payload))) as [];

      const logs = data.map((entry) => this.mapLog(entry));

      return logs;
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

  private mapLog(data: any): LogModel {
    return {
      WorkingTime: data[1],
      OnDay: new Date(data[2]).toLocaleDateString(),
      EntryTimestamp: new Date(data[3]).toLocaleString(),
      ExitTimestamp: new Date(data[4]).toLocaleString(),
      EmployeeId: data[5]
    };
  }
}
