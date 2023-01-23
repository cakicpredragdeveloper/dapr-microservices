import LocalStorage from "../../LocalStorage";
import NetworkController from "../../network/NetworkController";
import ITokenDataSource, { TokenDTO } from "./ITokenDataSource";

export class TokenDataSourceError extends Error {
  constructor(message: string) {
    super(`[TokenDataSource] Error - ${message}`);
  }
}

export default class TokenDataSource implements ITokenDataSource {
  constructor(private nwc: NetworkController, private storage: LocalStorage) {}

  async getToken(email: string, password: string): Promise<TokenDTO> {
    try {
      const data = new URLSearchParams();
      data.append("username", email);
      data.append("password", password);

      const result: any = await this.nwc.request({
        url: "/secret",
        method: "POST",
        data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      return {
        secret: result.data.secret
      };
    } catch (error: any) {
      throw new TokenDataSourceError(`[getToken] - ${error.message}`);
    }
  }

  storeToken({ secret }: TokenDTO): void {
    this.storage.set("secret", secret);
  }

  hasToken(): boolean {
    return this.storage.has("secret");
  }

  clearToken(): void {
    this.storage.remove("secret");
  }

  getStoredToken(): TokenDTO {
    return {
      secret: this.storage.get("secret")
    };
  }
}
