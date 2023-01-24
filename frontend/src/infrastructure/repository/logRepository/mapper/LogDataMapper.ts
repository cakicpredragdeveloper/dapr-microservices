import Log from "../../../../domain/modules/logDomain/entity/Log";
import { LogDTO } from "../../../dataSource/logDataSource/ILogDataSource";
import IMapper from "../../../IMapper";

export default class LogDataMapper implements IMapper<Log, LogDTO> {
  map({ WorkingTime, OnDay, EntryTimestamp, ExitTimestamp, EmployeeId }: Log): LogDTO {
    return {
      WorkingTime: WorkingTime.value,
      OnDay: OnDay.value,
      EntryTimestamp: EntryTimestamp.value,
      ExitTimestamp: ExitTimestamp.value,
      EmployeeId: EmployeeId.value
    };
  }
}
