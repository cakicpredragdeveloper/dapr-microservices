import ICheckAuthGateway from "../domain/modules/auth/gateway/ICheckAuthGateway";
import ISignInGateway from "../domain/modules/auth/gateway/ISignInGateway";
import ISignOutGateway from "../domain/modules/auth/gateway/ISignOutGateway";
import IGetEmployeesGateway from "../domain/modules/employee/gateway/IGetEmployeesGateway";
import RepositoryFactory from "./RepositoryFactory";

export default class GatewayFactory {
  constructor(private repositoryFactory: RepositoryFactory) {}

  getCheckAuthGateway(): ICheckAuthGateway {
    return this.repositoryFactory.getTokenRepository();
  }

  getSignInGateway(): ISignInGateway {
    return this.repositoryFactory.getTokenRepository();
  }

  getGetEmployeesGateway(): IGetEmployeesGateway {
    return this.repositoryFactory.getGetEmployeesGateway();
  }

  getSignOutGateway(): ISignOutGateway {
    return this.repositoryFactory.getTokenRepository();
  }
}
