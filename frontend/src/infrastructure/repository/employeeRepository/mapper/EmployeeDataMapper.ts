import Employee from "../../../../domain/modules/employee/entity/Employee";
import { EmployeeDTO } from "../../../dataSource/employeeDataSource/IEmployeeDataSource";
import IMapper from "../../../IMapper";

export default class EmployeeDataMapper implements IMapper<Employee, EmployeeDTO> {
  map({ EmployeeId, FirstName, LastName, Email, JobTitle }: Employee): EmployeeDTO {
    return {
      EmployeeId: EmployeeId.value,
      FirstName: FirstName.value,
      LastName: LastName.value,
      Email: Email.value,
      JobTitle: JobTitle.value
    };
  }
}
