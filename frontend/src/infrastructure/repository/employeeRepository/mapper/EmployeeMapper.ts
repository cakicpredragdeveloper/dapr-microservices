import NotEmptyString from "../../../../domain/base/valueObject/NotEmptyString";
import EmailInstance from "../../../../domain/base/valueObject/Email";
import Employee from "../../../../domain/modules/employee/entity/Employee";
import { EmployeeDTO } from "../../../dataSource/employeeDataSource/IEmployeeDataSource";
import IMapper from "../../../IMapper";

export class EmployeeMapperError extends Error {
  constructor(message: string) {
    super(`[EmployeeMapper] Error - ${message}`);
  }
}

export default class EmployeeMapper implements IMapper<EmployeeDTO, Employee> {
  map({ EmployeeId, FirstName, LastName, Email, JobTitle }: EmployeeDTO): Employee {
    try {
      return new Employee({
        EmployeeId: NotEmptyString.create(EmployeeId),
        FirstName: NotEmptyString.create(FirstName),
        LastName: NotEmptyString.create(LastName),
        Email: EmailInstance.create(Email),
        JobTitle: NotEmptyString.create(JobTitle)
      });
    } catch (err: any) {
      throw new EmployeeMapperError(err.message);
    }
  }
}
