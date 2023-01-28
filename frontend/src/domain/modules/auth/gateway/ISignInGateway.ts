import NotEmptyString from "../../../base/valueObject/NotEmptyString";
import Token from "../valueObject/Token";

export default interface ISignInGateway {
    getToken(email: NotEmptyString, password: NotEmptyString): Promise<Token>;
    storeToken(token: Token): void;
}