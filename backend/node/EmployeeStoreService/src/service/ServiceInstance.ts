import { DatabaseConfig } from "@app/config/types";
import { DaprClient } from "@dapr/dapr";
import Service, { LogModel } from "./Service";

export default class ServiceInstance implements Service {
  private readonly daprClient: DaprClient;
  private readonly store = "sqldb";
  private readonly table = "logs";

  constructor({ host, port }: DatabaseConfig) {
    this.daprClient = new DaprClient(host, port);
  }

  async insertWorkingHours(employees: LogModel[]): Promise<string> {
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

      const sql = `INSERT INTO ${this.table} (WorkingTime, OnDay, EntryTimestamp, ExitTimestamp, EmployeeId) values ${query};`;

      await this.daprClient.binding.send(this.store, "exec", "", JSON.parse(this.generateCommand(sql)));

      return "OK";
    } catch (err: any) {
      throw new Error(`[Dapr sidecar error]: ${err.message}`);
    }
  }

  private async createTableIfNotExist() {
    const sql = `
      CREATE TABLE IF NOT EXISTS ${this.table} 
      ( Id SERIAL NOT NULL, WorkingTime varchar(255), OnDay date, EntryTimestamp date, ExitTimestamp date, EmployeeId varchar(255) NOT NULL, 
      PRIMARY KEY (Id), FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeId) ); `;

    await this.daprClient.binding.send(this.store, "exec", "", JSON.parse(this.generateCommand(sql)));
  }

  private generateCommand(command: string): string {
    return `{"sql": "${command}"} `;
  }
}
