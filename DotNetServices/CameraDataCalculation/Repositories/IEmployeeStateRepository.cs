using CameraDataCalculation.Models;

namespace CameraDataCalculation.Repositories
{
    public interface IEmployeeStateRepository
    {
        Task SaveEmployeeStateAsync(EmployeeState employeeState);
        Task<EmployeeState> GetEmployeeStateAsync(string employeeId);
        Task DeleteEmployeeStateAsync(string employeeId);
        Task DeleteAllEmployeesAsync();
    }
}
