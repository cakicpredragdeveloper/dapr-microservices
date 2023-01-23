import NotEmptyString from "../../../base/valueObject/NotEmptyString";
import { ValueObject } from "../../../base/valueObject/ValueObject";

interface TokenProps {
  secret: NotEmptyString;
}

export default class Token extends ValueObject<TokenProps> {
  get secret() {
    return this.props.secret;
  }

  public equals(vo: ValueObject<TokenProps>): boolean {
    return this.props.secret === vo.props.secret;
  }
}
