import Employee from "../../../../domain/modules/employee/entity/Employee";
import { EmployeeDTO } from "../../../dataSource/employeeDataSource/IEmployeeDataSource";
import IMapper from "../../../IMapper";

export default interface IEmployeeMapperFactory {
  getEmployeeMapper(): IMapper<EmployeeDTO, Employee>;
  getEmployeeDataMapper(): IMapper<Employee, EmployeeDTO>;
}
