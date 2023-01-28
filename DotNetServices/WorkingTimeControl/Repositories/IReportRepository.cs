using WorkingTimeControl.Events;

namespace WorkingTimeControl.Repositories
{
    public interface IReportRepository
    {
        Task SaveReportAsync(InsufficientWorkingHours report);
        Task<List<InsufficientWorkingHours>> GetReportsAsync();
        Task DeleteReportsAsync();
        Task<DateTime?> GetCurrentDateAsync();
        Task SetCurrentDateAsync(DateTime currentDate);
        Task DeleteCurrentDateAsync();
    }
}
