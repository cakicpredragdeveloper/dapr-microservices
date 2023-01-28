export type TokenDTO = {
  secret: string;
};

export default interface ITokenDataSource {
  getToken(username: string, password: string): Promise<TokenDTO>;
  storeToken(data: TokenDTO): void;
  hasToken(): boolean;
  clearToken(): void;
  getStoredToken(): TokenDTO;
}
