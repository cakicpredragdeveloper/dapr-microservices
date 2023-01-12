using CameraDataCalculation.Models;

namespace CameraDataCalculation.Services
{
    public interface IEmployeeStateService
    {
        Task SaveEmployeeStateAsync(EmployeeState employeeState);
        Task<EmployeeState> GetEmployeeStateAsync(string employeeId);
    }
}
