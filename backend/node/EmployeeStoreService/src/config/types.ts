export interface ServiceConfig {
  port: string;
}

export interface DatabaseConfig extends ServiceConfig {
  host: string;
}

export type ConfigData = {
  env: string;
  server: ServiceConfig;
  database: DatabaseConfig;
};
