using CameraDataCalculation.Models;
using Dapr.Client;

namespace CameraDataCalculation.Repositories
{
    public class EmployeeStateRepository : IEmployeeStateRepository
    {

        #region Constants

        private const string _DAPR_STORE_NAME = "statestore";
        private const string _CURRENT_EMPLOYEES = "statestore_currentemployees";

        #endregion

        #region Private Fields

        private readonly DaprClient _daprClient;

        #endregion

        #region Constructors

        public EmployeeStateRepository(DaprClient daprClient)
        {
            _daprClient = daprClient;
        }

        #endregion

        #region Public methods

        public async Task<EmployeeState> GetEmployeeStateAsync(string employeeId)
        {
            try
            {
                var employeeStateEntry = await _daprClient.GetStateEntryAsync<EmployeeState>(_DAPR_STORE_NAME, employeeId);
                return employeeStateEntry.Value;
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
                var currentEmployees = await _daprClient.GetStateAsync<List<string>>(_DAPR_STORE_NAME, _CURRENT_EMPLOYEES);

                if (currentEmployees == null)
                {
                    currentEmployees = new List<string> { employeeState.EmployeeId };
                }
                else
                {
                    currentEmployees.Add(employeeState.EmployeeId);
                }

                await _daprClient.SaveStateAsync<EmployeeState>(_DAPR_STORE_NAME, employeeState.EmployeeId, employeeState);
                await _daprClient.SaveStateAsync<List<string>>(_DAPR_STORE_NAME, _CURRENT_EMPLOYEES, currentEmployees);
            }
            catch(Exception)
            {
                throw;
            }
        }

        public async Task DeleteEmployeeStateAsync(string employeeId)
        {
            try
            {
                var currentEmployees = await _daprClient.GetStateAsync<List<string>>(_DAPR_STORE_NAME, _CURRENT_EMPLOYEES);

                if (currentEmployees != null)
                {
                    var employeeToRemove = currentEmployees.Where(empoloyee => empoloyee.Equals(employeeId)).FirstOrDefault();

                    if (employeeToRemove != null)
                    {
                        currentEmployees.Remove(employeeToRemove);
                    }

                    await _daprClient.SaveStateAsync<List<string>>(_DAPR_STORE_NAME, _CURRENT_EMPLOYEES, currentEmployees);
                }

                await _daprClient.DeleteStateAsync(_DAPR_STORE_NAME, employeeId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task DeleteAllEmployeesAsync()
        {
            try
            {
                var currentEmployees = await _daprClient.GetStateAsync<List<string>>(_DAPR_STORE_NAME, _CURRENT_EMPLOYEES);

                if (currentEmployees != null && currentEmployees.Count() > 0)
                {
                    await _daprClient.DeleteBulkStateAsync(_DAPR_STORE_NAME,
                        currentEmployees.Select(x => new BulkDeleteStateItem(x, null)).ToList());
                }

                await _daprClient.DeleteStateAsync(_DAPR_STORE_NAME, _CURRENT_EMPLOYEES);
            }
            catch (Exception)
            {
                throw;
            }
        }

        #endregion
    }
}
