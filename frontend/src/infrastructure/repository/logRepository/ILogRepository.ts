import Log from "../../../domain/modules/logDomain/entity/Log";

export default interface ILogRepository {
  getEmployeeLogs(employeeId: string): Promise<Log[]>;
  getLogs(): Promise<Log[]>;
}
