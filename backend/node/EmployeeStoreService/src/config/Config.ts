import BaseConfig from "./BasicConfig";
import { ConfigData } from "./types";

export default class Config extends BaseConfig {
  private readonly ENV_PREFIX = "STORE_";
  private readonly ENV_DAPR_PREFIX = "DAPR_";

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
}
