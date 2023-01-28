using WorkingTimeControl.Events;

namespace WorkingTimeControl.Services
{
    public interface IReportService
    {
        Task SaveReportAsync(InsufficientWorkingHours report);
        Task<List<InsufficientWorkingHours>> GetReportsAsync();
        Task DeleteReportsAsync();
        Task<DateTime?> GetCurrentDateAsync();
        Task SetCurrentDateAsync(DateTime currentDate);
    }
}
