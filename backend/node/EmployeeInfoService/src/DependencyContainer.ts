import Api from "./api/Api";
import DatabaseController from "./api/controllers/DatabaseController";
import SecretController from "./api/controllers/SecretController";
import DatabaseRouter from "./api/routes/DatabaseRouter";
import SecretServiceRouter from "./api/routes/SecretRouter";
import Config from "./config/Config";
import { AuthConfig, ConfigData, DaprConfig } from "./config/types";
import DatabaseService from "./service/database/DatabaseService";
import SecretService from "./service/secret/SecretService";

export interface Dependency {
  config: ConfigData;
  api: Api;
}

interface Services {
  secret: SecretService;
  database: DatabaseService;
}

interface Controllers {
  secret: SecretController;
  database: DatabaseController;
}

export default class DependencyContainer {
  dependency(env: any): Dependency {
    const config = new Config(env).config;

    const services = this.load(config.dapr);

    const controllers = this.controllers(services, config.auth);

    return {
      config,
      api: new Api(new SecretServiceRouter(controllers.secret), new DatabaseRouter(controllers.database))
    };
  }

  private load(config: DaprConfig): Services {
    return {
      secret: new SecretService(config),
      database: new DatabaseService(config)
    };
  }

  private controllers({ secret, database }: Services, auth: AuthConfig): Controllers {
    return {
      secret: new SecretController(secret, auth),
      database: new DatabaseController(database)
    };
  }
}
