import NotEmptyString from "../../../../domain/base/valueObject/NotEmptyString";
import Token from "../../../../domain/modules/auth/valueObject/Token";
import { TokenDTO } from "../../../dataSource/tokenDataSource/ITokenDataSource";
import IMapper from "../../../IMapper";

export default class TokenMapper implements IMapper<TokenDTO, Token> {
  map(input: TokenDTO): Token {
    return new Token({
      secret: NotEmptyString.create(input.secret)
    });
  }
}
