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

        public async Task<HttpResponseMessage> SendDailyReports(List<InsufficientWorkingHours> reports)
        {  
            try
            {
                var response = await _httpClient.PostAsJsonAsync("v1/insert", reports);
                return response;
            }
            catch(Exception)
            {
                throw;
            }
        }
    }
}
