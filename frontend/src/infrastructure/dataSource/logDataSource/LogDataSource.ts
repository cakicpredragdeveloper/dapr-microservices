import NetworkController from "../../network/NetworkController";
import ILogDataSource, { LogDTO } from "./ILogDataSource";

export class LogDataSourceError extends Error {
  constructor(message: string) {
    super(`[LogDataSource] Error - ${message}`);
  }
}

export default class LogDataSource implements ILogDataSource {
  constructor(private nwc: NetworkController) {}

  async getLogs(): Promise<LogDTO[]> {
    try {
      const logs: any = await this.nwc.request({
        url: "/database/logs",
        method: "GET",
        useToken: true
      });

      return logs.data;
    } catch (error: any) {
      throw new LogDataSourceError(`[getLogs] - ${error.message}`);
    }
  }
}
