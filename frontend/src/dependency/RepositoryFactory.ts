import { HttpData } from "../config/Config";
import IGetEmployeesGateway from "../domain/modules/employee/gateway/IGetEmployeesGateway";
import EmployeeDataSource from "../infrastructure/dataSource/employeeDataSource/EmployeeDataSource";
import TokenDataSource from "../infrastructure/dataSource/tokenDataSource/TokenDataSource";
import LocalStorage from "../infrastructure/LocalStorage";
import NetworkController from "../infrastructure/network/NetworkController";
import EmployeeRepository from "../infrastructure/repository/employeeRepository/EmployeeRepository";
import EmployeeMapperFactory from "../infrastructure/repository/employeeRepository/factory/EmployeeMapperFactory";
import TokenRepositoryMapperFactory from "../infrastructure/repository/tokenRepository/factory/TokenRepositoryMapperFactory";
import { ITokenRepository } from "../infrastructure/repository/tokenRepository/ITokenRepository";
import { TokenRepository } from "../infrastructure/repository/tokenRepository/TokenRepository";

export default class RepositoryFactory {
  constructor(private nwc: NetworkController, private storage: LocalStorage, private httpConfig: HttpData) {}

  getTokenRepository(): ITokenRepository {
    return new TokenRepository(new TokenDataSource(this.nwc, this.storage), new TokenRepositoryMapperFactory());
  }

  getGetEmployeesGateway(): IGetEmployeesGateway {
    return new EmployeeRepository(new EmployeeDataSource(this.nwc), new EmployeeMapperFactory());
  }
}
