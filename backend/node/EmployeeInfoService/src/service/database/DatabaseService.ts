import { DaprConfig } from "@app/config/types";
import { DaprClient } from "@dapr/dapr";
import IDatabaseService, { EmployeeModel } from "./IDatabaseService";

export default class DatabaseService implements IDatabaseService {
  private readonly daprClient: DaprClient;
  private readonly store = "sqldb";
  private readonly table = "logs";

  constructor({ host, port }: DaprConfig) {
    this.daprClient = new DaprClient(host, port);
  }

  async getEmployees(): Promise<EmployeeModel[]> {
    try {
      const sqlCmd = `SELECT * FROM ${this.table};`;
      const payload = `{"sql": "${sqlCmd}"} `;

      const data = (await this.daprClient.binding.send(
        this.store,
        "query",
        "",
        JSON.parse(payload)
      )) as EmployeeModel[];

      return data;
    } catch (err: any) {
      throw new Error(`[Database error]: ${err.message}`);
    }
  }
}
