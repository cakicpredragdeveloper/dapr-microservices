export type SecretModel = {
  secret: string;
};

export default interface ISecretService {
  getSecret(): Promise<SecretModel>;
}
