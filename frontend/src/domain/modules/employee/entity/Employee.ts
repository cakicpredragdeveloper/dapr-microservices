import Email from "../../../base/valueObject/Email";
import NotEmptyString from "../../../base/valueObject/NotEmptyString";
import { ValueObject } from "../../../base/valueObject/ValueObject";

export class EmployeeError extends Error {
  constructor(message: string) {
    super(`[Employee] Error - ${message}`);
  }
}

interface EmployeeProps {
  EmployeeId: NotEmptyString;
  FirstName: NotEmptyString;
  LastName: NotEmptyString;
  Email: Email;
  JobTitle: NotEmptyString;
}

export default class Employee extends ValueObject<EmployeeProps> {
  public equals(_vo: ValueObject<EmployeeProps>): boolean {
    throw new Error("Method not implemented.");
  }

  get EmployeeId(): NotEmptyString {
    return this.props.EmployeeId;
  }

  get FirstName(): NotEmptyString {
    return this.props.FirstName;
  }

  get LastName(): NotEmptyString {
    return this.props.LastName;
  }

  get Email(): Email {
    return this.props.Email;
  }

  get JobTitle(): NotEmptyString {
    return this.props.JobTitle;
  }
}
