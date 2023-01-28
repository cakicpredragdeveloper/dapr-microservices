using Dapr.Client;
using WorkingTimeControl.Events;

namespace WorkingTimeControl.Repositories
{
    public class ReportRepository : IReportRepository
    {
        #region Constants

        private const string _DAPR_STORE_NAME = "reportstore";
        private const string _CURRENT_DATE = "currentdate";
        private const string _CURRENT_EMPLOYEES = "reportstore_currentemployees";

        #endregion

        #region Private Fields

        private readonly DaprClient _daprClient;

        #endregion

        #region Constructors

        public ReportRepository(DaprClient daprClient)
        {
            _daprClient = daprClient;
        }

        #endregion

        #region Public methods

        public async Task<List<InsufficientWorkingHours>> GetReportsAsync()
        {
            try
            {
                var employeeIds = await _daprClient.GetStateAsync<List<string>>(_DAPR_STORE_NAME, _CURRENT_EMPLOYEES);

                if (employeeIds != null && employeeIds.Count > 0)
                {
                    //var reportStates = await _daprClient.GetBulkStateAsync(_DAPR_STORE_NAME, employeeIds, null);
                    //var reports = reportStates.Select(x => x.Value).ToList();

                    var result = new List<InsufficientWorkingHours>();

                    foreach (var employeeId in employeeIds)
                    {
                        var report = await _daprClient.GetStateEntryAsync<InsufficientWorkingHours>(_DAPR_STORE_NAME, employeeId);

                        if (report != null && report.Value != null)
                        {
                            result.Add(report.Value);
                        }
                    }

                    return result;
                }

                return new List<InsufficientWorkingHours>();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task SaveReportAsync(InsufficientWorkingHours report)
        {
            try
            {
                var currentEmployees = await _daprClient.GetStateAsync<List<string>>(_DAPR_STORE_NAME, _CURRENT_EMPLOYEES);

                if (currentEmployees == null)
                {
                    currentEmployees = new List<string> { report.EmployeeId };
                }
                else
                {
                    currentEmployees.Add(report.EmployeeId);
                }

                await _daprClient.SaveStateAsync<InsufficientWorkingHours>(_DAPR_STORE_NAME, report.EmployeeId, report);
                await _daprClient.SaveStateAsync<List<string>>(_DAPR_STORE_NAME, _CURRENT_EMPLOYEES, currentEmployees);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task DeleteReportsAsync()
        {
            try
            {
                var employeeIds = await _daprClient.GetStateAsync<List<string>>(_DAPR_STORE_NAME, _CURRENT_EMPLOYEES);
                
                if (employeeIds != null && employeeIds.Count > 0 )
                {
                    await _daprClient.DeleteBulkStateAsync(_DAPR_STORE_NAME,
                        employeeIds.Select(x => new BulkDeleteStateItem(x, null)).ToList());

                    await _daprClient.DeleteStateAsync(_DAPR_STORE_NAME, _CURRENT_EMPLOYEES);
                }
            }
            catch(Exception ex)
            {
                throw;
            }
        }
        
        public async Task<DateTime?> GetCurrentDateAsync()
        {
            try
            {
                var currentDateState = await _daprClient.GetStateEntryAsync<DateTime>(_DAPR_STORE_NAME, _CURRENT_DATE);
                
                if(currentDateState != null && currentDateState?.Value != null)
                {
                    return currentDateState.Value;
                }

                return null;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task SetCurrentDateAsync(DateTime currentDate)
        {
            try
            {
                await _daprClient.SaveStateAsync<DateTime>(_DAPR_STORE_NAME, _CURRENT_DATE, currentDate);
            }
            catch(Exception)
            {
                throw;
            }
        }

        public async Task DeleteCurrentDateAsync()
        {
            try
            {
                await _daprClient.DeleteStateAsync(_DAPR_STORE_NAME, _CURRENT_DATE);
            }
            catch (Exception)
            {
                throw;
            }
        }

        #endregion
    }
}
