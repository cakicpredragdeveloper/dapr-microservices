import Employee from "../../../../domain/modules/employee/entity/Employee";
import IMapper from "../../../../infrastructure/IMapper";
import { EmployeeViewModel } from "../viewModel/EmployeeViewModel";

export default class EmployeePresentation implements IMapper<Employee, EmployeeViewModel> {
  public presentEmployees(employeeList: Employee[]): EmployeeViewModel[] {
    return employeeList.map((o) => this.map(o));
  }

  map(input: Employee): EmployeeViewModel {
    return {
      EmployeeId: input.EmployeeId.value,
      FirstName: input.FirstName.value,
      LastName: input.LastName.value,
      Email: input.Email.value,
      JobTitle: input.JobTitle.value
    };
  }
}
