import Log from "../../../../domain/modules/logDomain/entity/Log";
import IMapper from "../../../../infrastructure/IMapper";
import { LogViewModel } from "../viewModel/LogViewModel";

export default class LogPresentation implements IMapper<Log, LogViewModel> {
  public presentLogs(logList: Log[]): LogViewModel[] {
    return logList.map((o) => this.map(o));
  }

  map(input: Log): LogViewModel {
    return {
      WorkingTime: input.WorkingTime.value,
      EntryTimestamp: input.EntryTimestamp.value,
      ExitTimestamp: input.ExitTimestamp.value,
      EmployeeId: input.EmployeeId.value
    };
  }
}
