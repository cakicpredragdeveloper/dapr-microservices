import { DatabaseConfig } from "@app/config/types";
import { DaprClient } from "@dapr/dapr";
import Service, { LogModel } from "./Service";
import ServiceError from "./ServiceError";
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
    const date = new Date();
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);

    // let query = "";
    // employees.forEach((employee, ind) => {
    //   query += ind > 0 ? "," : "";

    //   query += `('${employee.WorkingTime}', ${date}, ${new Date(employee.EntryTimestamp)}, ${new Date(
    //     employee.ExitTimestamp
    //   )}, '${employee.EmployeeId}')`;

    //   query += ind === employees.length - 1 ? ";" : "";
    // });

    // console.log(query);

    await employees.forEach(async (employee) => {
      const sqlTableCmd = `CREATE TABLE Logs ( Id int NOT NULL, WorkingTime varchar(255), OnDay date, EntryTimestamp date, ExitTimestamp date, EmployeeId varchar(255) NOT NULL, PRIMARY KEY (Id), FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeId) ); `;

      const value = `'${employee.WorkingTime}', ${date}, ${new Date(employee.EntryTimestamp)}, ${new Date(
        employee.ExitTimestamp
      )}, '${employee.EmployeeId}'`;

      const sqlCmd = `INSERT INTO ${this.table} (WorkingTime, OnDay, EntryTimestamp, ExitTimestamp, EmployeeId) values (${value});`;
      const tablePayload = `{"sql": "${sqlTableCmd}"} `;
      const payload = `{"sql": "${sqlCmd}"} `;

      await this.daprClient.binding.send(this.store, "exec", "", JSON.parse(tablePayload));
      await this.daprClient.binding.send(this.store, "exec", "", JSON.parse(payload));
    });

    return "OK";
  }
}
