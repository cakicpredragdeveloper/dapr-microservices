import BaseConfig from "./BasicConfig";
import { ConfigData } from "./types";

export default class Config extends BaseConfig {
  private readonly ENV_PREFIX = "INFO_";
  private readonly ENV_DAPR_PREFIX = "DAPR_";
  private readonly ENV_DATABASE_PREFIX = "DATABASE_";
  private readonly ENV_SECRET_PREFIX = "SECRET_";

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
      auth: {
        username: this.convertToString(this.generateKey("USERNAME"), env[this.generateKey("USERNAME")]),
        password: this.convertToString(this.generateKey("PASSWORD"), env[this.generateKey("PASSWORD")])
      },
      dapr: {
        host: this.convertToString(this.generateDaprKey("HOST"), env[this.generateDaprKey("HOST")]),
        port: this.convertToString(this.generateDaprKey("PORT"), env[this.generateDaprKey("PORT")])
      }
    };
  }

  private generateKey(key: string) {
    return `${this.ENV_PREFIX}${key}`;
  }

  private generateDaprKey(key: string) {
    return `${this.ENV_DAPR_PREFIX}${key}`;
  }

  private generateDatabaseKey(key: string) {
    return `${this.ENV_DATABASE_PREFIX}${key}`;
  }

  private generateSecretKey(key: string) {
    return `${this.ENV_SECRET_PREFIX}${key}`;
  }
}
