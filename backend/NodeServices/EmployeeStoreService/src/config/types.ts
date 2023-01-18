export interface ServiceConfig {
  port: string;
}

export interface DatabaseConfig extends ServiceConfig {
  id: string;
  host: string;
  table: string;
}

export type ConfigData = {
  env: string;
  server: ServiceConfig;
  database: DatabaseConfig;
};
