import { DatabaseConfig } from "@app/config/types";
import { DaprClient } from "@dapr/dapr";
import IDatabaseService, { EmployeeModel } from "./IDatabaseService";

export default class DatabaseService implements IDatabaseService {
  private readonly daprClient: DaprClient;
  private readonly store: string;
  private readonly table: string;

  constructor({ id, host, port, table }: DatabaseConfig) {
    this.daprClient = new DaprClient(host, port);
    this.store = id;
    this.table = table;
  }

  async getEmployees(): Promise<EmployeeModel[]> {
    try {
      const sqlCmd = `SELECT * FROM ${this.table};`;
      const payload = `{"sql": "${sqlCmd}"} `;

      const data = (await this.daprClient.binding.send(this.store, "exec", "", JSON.parse(payload))) as EmployeeModel[];

      return data;
    } catch (err: any) {
      throw new Error(`[Database error]: ${err.message}`);
    }
  }
}
