using WorkingTimeControl.Events;
using WorkingTimeControl.Repositories;

namespace WorkingTimeControl.Services
{
    public class ReportService : IReportService
    {
        #region Private fields

        private readonly IReportRepository _reportRepository;

        #endregion

        #region Constructors

        public ReportService(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }

        #endregion

        #region Public methods

        public async Task DeleteReportsAsync()
        {
            try
            {
                await _reportRepository.DeleteReportsAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DateTime?> GetCurrentDateAsync()
        {
            try
            {
                return await _reportRepository.GetCurrentDateAsync();
            }
            catch(Exception)
            {
                throw;
            }
        }

        public async Task<List<InsufficientWorkingHours>> GetReportsAsync()
        {
            try
            {
                return await _reportRepository.GetReportsAsync();
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
                await _reportRepository.SaveReportAsync(report);
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
                await _reportRepository.SetCurrentDateAsync(currentDate);
            }
            catch (Exception)
            {
                throw;
            }
        }

        #endregion
    }
}
