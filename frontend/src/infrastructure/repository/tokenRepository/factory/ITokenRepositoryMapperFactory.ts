import Token from "../../../../domain/modules/auth/valueObject/Token";
import { TokenDTO } from "../../../dataSource/tokenDataSource/ITokenDataSource";
import IMapper from "../../../IMapper";

export default interface ITokenRepositoryMapperFactory {
    getTokenMapper(): IMapper<TokenDTO, Token>;
    getTokenDataMapper(): IMapper<Token, TokenDTO>;
}