import Log from "../../../domain/modules/logDomain/entity/Log";

export default interface ILogRepository {
  getLogs(): Promise<Log[]>;
}
