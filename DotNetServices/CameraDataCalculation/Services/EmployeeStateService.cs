using CameraDataCalculation.Models;
using CameraDataCalculation.Repositories;

namespace CameraDataCalculation.Services
{
    public class EmployeeStateService : IEmployeeStateService
    {
        private readonly IEmployeeStateRepository _employeeRepository;

        public EmployeeStateService(IEmployeeStateRepository employeeStateRepository)
        {
            _employeeRepository = employeeStateRepository;
        }

        public Task<EmployeeState> GetEmployeeStateAsync(string employeeId)
        {
            var employeeState = _employeeRepository.GetEmployeeStateAsync(employeeId);
            return employeeState;
        }

        public async Task SaveEmployeeStateAsync(EmployeeState employeeState)
        {
            await _employeeRepository.SaveEmployeeStateAsync(employeeState);
        }
    }
}
