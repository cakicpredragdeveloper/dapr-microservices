import { DatabaseConfig } from "@app/config/types";
import { DaprClient } from "@dapr/dapr";
import Service, { LogModel } from "./Service";
import { Response } from "express";

export default class ServiceInstance implements Service {
  private readonly daprClient: DaprClient;
  private readonly store: string;
  private readonly table: string;

  constructor({ id, host, port, table }: DatabaseConfig) {
    this.daprClient = new DaprClient(host, port);
    this.store = id;
    this.table = table;
  }

  async insertWorkingHours(employees: LogModel[], res: Response): Promise<string> {
    try {
      const date = new Date();
      date.setMilliseconds(0);
      date.setSeconds(0);
      date.setMinutes(0);
      date.setHours(1);

      await this.createTableIfNotExist();

      let query = ``;
      employees.forEach((employee, ind) => {
        if (ind > 0) query += ",";

        query += `('${employee.WorkingTime}', '${date.toISOString()}', '${new Date(
          employee.EntryTimestamp
        ).toISOString()}', '${new Date(employee.ExitTimestamp).toISOString()}', '${employee.EmployeeId}')`;
      });

      const sqlCmd = `INSERT INTO ${this.table} (WorkingTime, OnDay, EntryTimestamp, ExitTimestamp, EmployeeId) values ${query};`;
      const payload = `{"sql": "${sqlCmd}"} `;

      await this.daprClient.binding.send(this.store, "exec", "", JSON.parse(payload));

      return "OK";
    } catch (err: any) {
      throw new Error(`[Dapr sidecar error]: ${err.message}`);
    }
  }

  private async createTableIfNotExist() {
    const sqlTableCmd = `CREATE TABLE IF NOT EXISTS ${this.table} ( Id SERIAL NOT NULL, WorkingTime varchar(255), OnDay date, EntryTimestamp date, ExitTimestamp date, EmployeeId varchar(255) NOT NULL, PRIMARY KEY (Id), FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeId) ); `;
    const tableSQL = `{"sql": "${sqlTableCmd}"} `;

    await this.daprClient.binding.send(this.store, "exec", "", JSON.parse(tableSQL));
  }
}
