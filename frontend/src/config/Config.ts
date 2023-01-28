export class ConfigError extends Error {
  constructor(message: string) {
    super(`[Config] Error - ${message}`);
  }
}

export type HttpData = {
  baseUrl: string;
};

export type ConfigData = {
  env: string;
  http: HttpData;
};

export default class Config {
  private _config!: ConfigData;

  constructor(env: any) {
    this._config = this.parseConfig(env);
  }

  private parseConfig(env: any): ConfigData {
    try {
      return {
        env: Config.convertToString("NODE_ENV", env.REACT_APP_NODE_ENV),
        http: {
          baseUrl: Config.convertToString("WEB_ROOT", env.REACT_APP_BASE_URL)
        }
      };
    } catch (error: any) {
      throw new ConfigError(`[parseConfig] - ${error.message}`);
    }
  }

  public getNodeEnv(): string {
    return this._config.env;
  }

  public getHttpConfig(): HttpData {
    return this._config.http;
  }

  public static convertToString(tag: string, value: any): string {
    if (!value) throw new ConfigError(`[convertToString] - ${tag} string is undefined.`);

    const result = String(value).valueOf();
    if (result.length === 0) throw new ConfigError(`[convertToString] - ${tag} string is empty.`);
    return result;
  }
}
