import Config from "../config/Config";
import LocalStorage from "../infrastructure/LocalStorage";
import NetworkController from "../infrastructure/network/NetworkController";
import GatewayFactory from "./GatewayFactory";
import RepositoryFactory from "./RepositoryFactory";

export class Dependency {
  private _config;
  private _nwc;
  private _storage;
  private _gatewayFactory;
  private _repositoryFactory;

  constructor(env: any) {
    this._config = new Config(env);
    this._storage = new LocalStorage(localStorage);
    this._nwc = new NetworkController(this._config.getHttpConfig());
    this._repositoryFactory = new RepositoryFactory(this._nwc, this._storage, this._config.getHttpConfig());
    this._gatewayFactory = new GatewayFactory(this._repositoryFactory);
  }

  get gatewayFactory() {
    return this._gatewayFactory;
  }
}
