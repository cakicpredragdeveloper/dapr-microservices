import Log from "../entity/Log";

export default interface IGetLogsGateway {
  getLogs(): Promise<Log[]>;
}
