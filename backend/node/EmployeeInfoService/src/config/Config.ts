import BaseConfig from "./BasicConfig";
import { ConfigData } from "./types";

export default class Config extends BaseConfig {
  private readonly ENV_PREFIX = "STORE_";
  private readonly ENV_DATABASE_PREFIX = "DAPR_DATABASE_";
  private readonly ENV_SECRET_PREFIX = "DAPR_SECRET_";

  public readonly config: ConfigData;
  constructor(env: any) {
    super();
    this.config = this.parseConfig(env);
  }

  protected parseConfig(env: any): ConfigData {
    return {
      env: this.convertToString(`NODE_ENV`, env[`NODE_ENV`]),
      server: {
        port: this.convertToString(this.generateKey("SERVICE_HTTP_PORT"), env[this.generateKey("SERVICE_HTTP_PORT")])
      },
      database: {
        id: this.convertToString(this.generateDatabaseKey("ID"), env[this.generateDatabaseKey("ID")]),
        host: this.convertToString(this.generateDatabaseKey("HOST"), env[this.generateDatabaseKey("HOST")]),
        port: this.convertToString(this.generateDatabaseKey("PORT"), env[this.generateDatabaseKey("PORT")]),
        table: this.convertToString(this.generateDatabaseKey("TABLE"), env[this.generateDatabaseKey("TABLE")])
      },
      secret: {
        host: this.convertToString(this.generateSecretKey("HOST"), env[this.generateSecretKey("HOST")]),
        port: this.convertToString(this.generateSecretKey("PORT"), env[this.generateSecretKey("PORT")]),
        store: this.convertToString(this.generateSecretKey("STORE"), env[this.generateSecretKey("STORE")]),
        name: this.convertToString(this.generateSecretKey("NAME"), env[this.generateSecretKey("NAME")])
      }
    };
  }

  private generateKey(key: string) {
    return `${this.ENV_PREFIX}${key}`;
  }

  private generateDatabaseKey(key: string) {
    return `${this.ENV_DATABASE_PREFIX}${key}`;
  }

  private generateSecretKey(key: string) {
    return `${this.ENV_SECRET_PREFIX}${key}`;
  }
}
