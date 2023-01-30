import NotEmptyString from "../../../base/valueObject/NotEmptyString";
import { ValueObject } from "../../../base/valueObject/ValueObject";

export class LogError extends Error {
  constructor(message: string) {
    super(`[Log] Error - ${message}`);
  }
}

interface LogProps {
  WorkingTime: NotEmptyString;
  EntryTimestamp: NotEmptyString;
  ExitTimestamp: NotEmptyString;
  EmployeeId: NotEmptyString;
}

export default class Log extends ValueObject<LogProps> {
  public equals(_vo: ValueObject<LogProps>): boolean {
    throw new Error("Method not implemented.");
  }

  get WorkingTime(): NotEmptyString {
    return this.props.WorkingTime;
  }

  get EntryTimestamp(): NotEmptyString {
    return this.props.EntryTimestamp;
  }

  get ExitTimestamp(): NotEmptyString {
    return this.props.ExitTimestamp;
  }

  get EmployeeId(): NotEmptyString {
    return this.props.EmployeeId;
  }
}
