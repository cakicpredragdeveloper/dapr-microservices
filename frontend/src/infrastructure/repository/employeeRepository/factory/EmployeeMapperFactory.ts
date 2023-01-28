import Employee from "../../../../domain/modules/employee/entity/Employee";
import { EmployeeDTO } from "../../../dataSource/employeeDataSource/IEmployeeDataSource";
import IMapper from "../../../IMapper";
import EmployeeDataMapper from "../mapper/EmployeeDataMapper";
import EmployeeMapper from "../mapper/EmployeeMapper";
import IEmployeeMapperFactory from "./IEmployeeMapperFactory";

export default class EmployeeMapperFactory implements IEmployeeMapperFactory {
  getEmployeeMapper(): IMapper<EmployeeDTO, Employee> {
    return new EmployeeMapper();
  }

  getEmployeeDataMapper(): IMapper<Employee, EmployeeDTO> {
    return new EmployeeDataMapper();
  }
}
