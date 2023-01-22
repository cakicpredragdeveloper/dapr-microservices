export interface ServiceConfig {
  port: string;
}

export interface DatabaseConfig extends ServiceConfig {
  id: string;
  host: string;
  table: string;
}

export interface SecretConfig extends ServiceConfig {
  host: string;
  store: string;
  name: string;
}

export type ConfigData = {
  env: string;
  server: ServiceConfig;
  database: DatabaseConfig;
  secret: SecretConfig;
};
