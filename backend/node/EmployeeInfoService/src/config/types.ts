export interface ServiceConfig {
  port: string;
}

export interface AuthConfig {
  username: string;
  password: string;
}

export interface DaprConfig extends ServiceConfig {
  host: string;
}

export type ConfigData = {
  env: string;
  server: ServiceConfig;
  auth: AuthConfig;
  dapr: DaprConfig;
};
