using CameraDataCalculation.Models;
using Dapr.Client;

namespace CameraDataCalculation.Repositories
{
    public class EmployeeStateRepository : IEmployeeStateRepository
    {
        private const string _DAPR_STORE_NAME = "statestore";
        private readonly DaprClient _daprClient;

        public EmployeeStateRepository(DaprClient daprClient)
        {
            _daprClient = daprClient;
        }

        public async Task<EmployeeState> GetEmployeeStateAsync(string employeeId)
        {
            var employeeStateEntry = await _daprClient.GetStateEntryAsync<EmployeeState>(_DAPR_STORE_NAME, employeeId);
            return employeeStateEntry.Value;
        }

        public async Task SaveEmployeeStateAsync(EmployeeState employeeState)
        {
            await _daprClient.SaveStateAsync<EmployeeState>(_DAPR_STORE_NAME, employeeState.EmployeeId, employeeState);
        }
    }
}
