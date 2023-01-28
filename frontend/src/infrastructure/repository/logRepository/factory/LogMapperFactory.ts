import Log from "../../../../domain/modules/logDomain/entity/Log";
import { LogDTO } from "../../../dataSource/logDataSource/ILogDataSource";
import IMapper from "../../../IMapper";
import LogDataMapper from "../mapper/LogDataMapper";
import LogMapper from "../mapper/LogMapper";
import ILogMapperFactory from "./ILogMapperFactory";

export default class LogMapperFactory implements ILogMapperFactory {
  getLogMapper(): IMapper<LogDTO, Log> {
    return new LogMapper();
  }

  getLogDataMapper(): IMapper<Log, LogDTO> {
    return new LogDataMapper();
  }
}
