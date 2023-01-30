import NotEmptyString from "../../../../domain/base/valueObject/NotEmptyString";
import Log from "../../../../domain/modules/logDomain/entity/Log";
import { LogDTO } from "../../../dataSource/logDataSource/ILogDataSource";
import IMapper from "../../../IMapper";

export class LogMapperError extends Error {
  constructor(message: string) {
    super(`[LogMapper] Error - ${message}`);
  }
}

export default class LogMapper implements IMapper<LogDTO, Log> {
  map({ WorkingTime, EntryTimestamp, ExitTimestamp, EmployeeId }: LogDTO): Log {
    try {
      return new Log({
        WorkingTime: NotEmptyString.create(WorkingTime),
        EntryTimestamp: NotEmptyString.create(EntryTimestamp),
        ExitTimestamp: NotEmptyString.create(ExitTimestamp),
        EmployeeId: NotEmptyString.create(EmployeeId)
      });
    } catch (err: any) {
      throw new LogMapperError(err.message);
    }
  }
}
