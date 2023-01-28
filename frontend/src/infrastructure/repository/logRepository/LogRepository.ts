import Log from "../../../domain/modules/logDomain/entity/Log";
import ILogDataSource from "../../dataSource/logDataSource/ILogDataSource";
import ILogMapperFactory from "./factory/ILogMapperFactory";
import ILogRepository from "./ILogRepository";

export class LogRepositoryError extends Error {
  constructor(message: string) {
    super(`[LogRepository] Error - ${message}`);
  }
}

export default class LogRepository implements ILogRepository {
  constructor(private _dataSource: ILogDataSource, private _mapperFactory: ILogMapperFactory) {}

  async getEmployeeLogs(employeeId: string): Promise<Log[]> {
    try {
      const logs = await this._dataSource.getEmployeeLogs(employeeId);
      const logsMap = logs.map((logData) => this._mapperFactory.getLogMapper().map(logData));

      return logsMap;
    } catch (error: any) {
      throw new LogRepositoryError(`[getLogs] - ${error.message}`);
    }
  }

  async getLogs(): Promise<Log[]> {
    try {
      const logs = await this._dataSource.getLogs();
      const logsMap = logs.map((logData) => this._mapperFactory.getLogMapper().map(logData));

      return logsMap;
    } catch (error: any) {
      throw new LogRepositoryError(`[getLogs] - ${error.message}`);
    }
  }
}
