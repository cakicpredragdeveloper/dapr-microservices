import NotEmptyString from "../../../domain/base/valueObject/NotEmptyString";
import Token from "../../../domain/modules/auth/valueObject/Token";

export interface ITokenRepository {
  getToken(username: NotEmptyString, password: NotEmptyString): Promise<Token>;
  storeToken(token: Token): void;
  hasToken(): boolean;
  clearToken(): void;
  getStoredToken(): Token;
}
