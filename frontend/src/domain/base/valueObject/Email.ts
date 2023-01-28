import { ValueObject } from "./ValueObject";

export class EmailError extends Error {
  constructor(message: string) {
    super(`[Email] Error - ${message}`);
  }
}

interface EmailProps {
  value: string;
}

export default class Email extends ValueObject<EmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: EmailProps) {
    super(props);
  }

  public static create(email: string): Email {
    if (!Email.validate(email)) throw new EmailError(`Provided email is not valid. Email - ${email}`);

    return new Email({ value: email });
  }

  private static validate(value: string): boolean {
    if (value === undefined || value === null) return false;

    return (
      value.replace(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ""
      ).length === 0
    );
  }

  public equals(vo: ValueObject<EmailProps>): boolean {
    return vo.props.value === this.value;
  }
}
