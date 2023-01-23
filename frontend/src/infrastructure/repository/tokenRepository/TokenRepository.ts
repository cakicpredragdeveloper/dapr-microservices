import NotEmptyString from "../../../domain/base/valueObject/NotEmptyString";
import Token from "../../../domain/modules/auth/valueObject/Token";
import ITokenDataSource from "../../dataSource/tokenDataSource/ITokenDataSource";
import ITokenRepositoryMapperFactory from "./factory/ITokenRepositoryMapperFactory";
import { ITokenRepository } from "./ITokenRepository";

export class TokenRepositoryError extends Error {
  constructor(message: string) {
    super(`[TokenRepository] Error - ${message}`);
  }
}

export class TokenRepository implements ITokenRepository {
  constructor(private _dataSource: ITokenDataSource, private _mapperFactory: ITokenRepositoryMapperFactory) {}

  async getToken(email: NotEmptyString, password: NotEmptyString): Promise<Token> {
    try {
      return this._mapperFactory.getTokenMapper().map(await this._dataSource.getToken(email.value, password.value));
    } catch (err: any) {
      throw new TokenRepositoryError(`[getToken] - ${err.message}`);
    }
  }

  storeToken(token: Token) {
    return this._dataSource.storeToken(this._mapperFactory.getTokenDataMapper().map(token));
  }

  hasToken(): boolean {
    return this._dataSource.hasToken();
  }

  clearToken(): void {
    return this._dataSource.clearToken();
  }

  getStoredToken(): Token {
    return this._mapperFactory.getTokenMapper().map(this._dataSource.getStoredToken());
  }
}
