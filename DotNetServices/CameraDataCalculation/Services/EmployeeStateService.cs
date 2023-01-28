using CameraDataCalculation.Models;
using CameraDataCalculation.Repositories;

namespace CameraDataCalculation.Services
{
    public class EmployeeStateService : IEmployeeStateService
    {
        #region Private fields
        
        private readonly IEmployeeStateRepository _employeeRepository;

        #endregion

        #region Constructors

        public EmployeeStateService(IEmployeeStateRepository employeeStateRepository)
        {
            _employeeRepository = employeeStateRepository;
        }

        #endregion

        #region Public methods

        public async Task DeleteEmployeeStateAsync(string employeeId)
        {
            try
            {
                await _employeeRepository.DeleteEmployeeStateAsync(employeeId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<EmployeeState> GetEmployeeStateAsync(string employeeId)
        {
            try
            {
                var employeeState = await _employeeRepository.GetEmployeeStateAsync(employeeId);
                return employeeState;
            }
            catch(Exception)
            {
                throw;
            }
        }

        public async Task SaveEmployeeStateAsync(EmployeeState employeeState)
        {
            try
            {
                await _employeeRepository.SaveEmployeeStateAsync(employeeState);
            }
            catch(Exception)
            {
                throw;
            }
        }

        #endregion
    }
}
