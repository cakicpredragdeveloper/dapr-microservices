import { HttpData } from "../config/Config";
import EmployeeDataSource from "../infrastructure/dataSource/employeeDataSource/EmployeeDataSource";
import LogDataSource from "../infrastructure/dataSource/logDataSource/LogDataSource";
import TokenDataSource from "../infrastructure/dataSource/tokenDataSource/TokenDataSource";
import LocalStorage from "../infrastructure/LocalStorage";
import NetworkController from "../infrastructure/network/NetworkController";
import EmployeeRepository from "../infrastructure/repository/employeeRepository/EmployeeRepository";
import EmployeeMapperFactory from "../infrastructure/repository/employeeRepository/factory/EmployeeMapperFactory";
import IEmployeeRepository from "../infrastructure/repository/employeeRepository/IEmployeeRepository";
import LogRepository from "../infrastructure/repository/logRepository/LogRepository";
import LogMapperFactory from "../infrastructure/repository/logRepository/factory/LogMapperFactory";
import ILogRepository from "../infrastructure/repository/logRepository/ILogRepository";
import TokenRepositoryMapperFactory from "../infrastructure/repository/tokenRepository/factory/TokenRepositoryMapperFactory";
import { ITokenRepository } from "../infrastructure/repository/tokenRepository/ITokenRepository";
import { TokenRepository } from "../infrastructure/repository/tokenRepository/TokenRepository";
import IGetEmployeeGateway from "../domain/modules/employee/gateway/IGetEmployeeGateway";
import GetEmployeeGateway from "../infrastructure/repository/employeeRepository/gateway/GetEmployeeGateway";

export default class RepositoryFactory {
  constructor(private nwc: NetworkController, private storage: LocalStorage, private httpConfig: HttpData) {}

  getTokenRepository(): ITokenRepository {
    return new TokenRepository(new TokenDataSource(this.nwc, this.storage), new TokenRepositoryMapperFactory());
  }

  getEmployeeRepository(): IEmployeeRepository {
    return new EmployeeRepository(new EmployeeDataSource(this.nwc), new EmployeeMapperFactory());
  }

  getGetLogRepository(): ILogRepository {
    return new LogRepository(new LogDataSource(this.nwc), new LogMapperFactory());
  }

  getEmployeeGateway(): IGetEmployeeGateway {
    return new GetEmployeeGateway(
      new EmployeeRepository(new EmployeeDataSource(this.nwc), new EmployeeMapperFactory()),
      new LogRepository(new LogDataSource(this.nwc), new LogMapperFactory())
    );
  }
}
