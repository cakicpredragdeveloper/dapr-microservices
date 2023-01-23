import Token from "../valueObject/Token";

export default interface ISignOutGateway {
  clearToken(): void;
  getStoredToken(): Token;
}
