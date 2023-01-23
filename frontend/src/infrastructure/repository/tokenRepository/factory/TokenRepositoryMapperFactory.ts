import Token from "../../../../domain/modules/auth/valueObject/Token";
import { TokenDTO } from "../../../dataSource/tokenDataSource/ITokenDataSource";
import IMapper from "../../../IMapper";
import TokenDataMapper from "../mapper/TokenDataMapper";
import TokenMapper from "../mapper/TokenMapper";
import ITokenRepositoryMapperFactory from "./ITokenRepositoryMapperFactory";

export default class TokenRepositoryMapperFactory implements ITokenRepositoryMapperFactory {
    getTokenMapper(): IMapper<TokenDTO, Token> {
        return new TokenMapper();
    }
    
    getTokenDataMapper(): IMapper<Token, TokenDTO> {
        return new TokenDataMapper();
    }
}