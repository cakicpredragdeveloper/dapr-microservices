import { ValueObject } from "./ValueObject";

export class NotEmptyStringError extends Error {
  constructor(message: string) {
    super(`[NotEmptyString] Error - ${message}`);
  }
}

interface NotEmptyStringDataProps {
  value: string;
}

export default class NotEmptyString extends ValueObject<NotEmptyStringDataProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: NotEmptyStringDataProps) {
    super(props);
  }

  public static create(value: string, tag?: string): NotEmptyString {
    if (!NotEmptyString.validate(value))
      throw new NotEmptyStringError(`Provided string value is empty. ${tag ? `<tag ${tag}/>` : ""}`);
    return new NotEmptyString({ value });
  }

  private static validate(value: string): boolean {
    return value !== null && value !== undefined && value.trim().length > 0;
  }

  public equals(vo: ValueObject<NotEmptyStringDataProps>): boolean {
    return this.value === vo.props.value;
  }
}
