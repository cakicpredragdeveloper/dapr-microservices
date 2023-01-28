import Log from "../../../../domain/modules/logDomain/entity/Log";
import { LogDTO } from "../../../dataSource/logDataSource/ILogDataSource";
import IMapper from "../../../IMapper";

export default interface ILogMapperFactory {
  getLogMapper(): IMapper<LogDTO, Log>;
  getLogDataMapper(): IMapper<Log, LogDTO>;
}
