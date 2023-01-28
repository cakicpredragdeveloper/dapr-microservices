using WorkingTimeControl.Events;

namespace WorkingTimeControl.Proxies
{
    public class EmployeeStoreService
    { 
        private HttpClient _httpClient;

        public EmployeeStoreService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task SendDailyReports(List<InsufficientWorkingHours> reports)
        {
            try
            {
                await _httpClient.PostAsJsonAsync<List<InsufficientWorkingHours>>("v1/insert", reports);
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}
