import { DaprConfig } from "@app/config/types";
import { DaprClient } from "@dapr/dapr";
import ServiceError from "../ServiceError";
import ISecretService, { SecretModel } from "./ISecretService";

export default class SecretService implements ISecretService {
  private readonly daprClient: DaprClient;
  private readonly store = "localsecretstore";
  private readonly name = "secret";

  constructor({ host, port }: DaprConfig) {
    this.daprClient = new DaprClient(host, port);
  }

  async getSecret(): Promise<SecretModel> {
    try {
      const secret = (await this.daprClient.secret.get(this.store, this.name)) as SecretModel;

      if (secret.secret === null && secret.secret === undefined)
        throw new ServiceError(`SecretService Error - Secret string not provided!`);

      return secret;
    } catch (err: any) {
      throw new ServiceError(`SecretService Error - ${err.message}`);
    }
  }
}
