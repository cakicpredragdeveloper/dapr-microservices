import Api from "./api/Api";
import DatabaseController from "./api/controllers/DatabaseController";
import SecretController from "./api/controllers/SecretController";
import DatabaseRouter from "./api/routes/DatabaseRouter";
import SecretServiceRouter from "./api/routes/SecretRouter";
import Config from "./config/Config";
import { ConfigData } from "./config/types";
import DatabaseService from "./service/database/DatabaseSevice";
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

    const services = this.load(config);

    const controllers = this.controllers(services);

    return {
      config,
      api: new Api(new SecretServiceRouter(controllers.secret), new DatabaseRouter(controllers.database))
    };
  }

  private load(config: ConfigData): Services {
    return {
      secret: new SecretService(config.secret),
      database: new DatabaseService(config.database)
    };
  }

  private controllers({ secret, database }: Services): Controllers {
    return {
      secret: new SecretController(secret),
      database: new DatabaseController(database)
    };
  }
}
