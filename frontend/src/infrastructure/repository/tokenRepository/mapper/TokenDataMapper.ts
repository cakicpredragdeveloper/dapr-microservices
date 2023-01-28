import Token from "../../../../domain/modules/auth/valueObject/Token";
import { TokenDTO } from "../../../dataSource/tokenDataSource/ITokenDataSource";
import IMapper from "../../../IMapper";

export default class TokenDataMapper implements IMapper<Token, TokenDTO> {
  map(input: Token): TokenDTO {
    return {
      secret: input.secret.value
    };
  }
}
