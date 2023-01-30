using Microsoft.AspNetCore.Mvc;
using Dapr;
using WorkingTimeControl.Events;
using WorkingTimeControl.Services;
using WorkingTimeControl.Proxies;
using Newtonsoft.Json;

namespace WorkingTimeControl.Controllers
{
    [ApiController]
    [Route("")]
    public class ReportController : ControllerBase
    {
        private readonly ILogger<ReportController> _logger;
        private readonly IReportService _reportService;
        private readonly EmployeeStoreService _eployeeStoreService;

        public ReportController(ILogger<ReportController> logger, IReportService reportService,
            EmployeeStoreService eployeeStoreService)
        {
            _logger = logger;
            _reportService = reportService;
            _eployeeStoreService = eployeeStoreService;
        }

        [Topic("pubsub", "insufficient-working-hours", false)]
        [Route("report")]
        [HttpPost]
        public async Task<IActionResult> ReportAsync(InsufficientWorkingHours model)
        {
            try
            {
                _logger.LogInformation($"CollectionController.ReportAsync: Subscriber received report for employee {model.EmployeeId}");
                
                var currentDate = await _reportService.GetCurrentDateAsync();
                _logger.LogInformation($"\n\n\nmodel: {JsonConvert.SerializeObject(model)}, currentDate: {currentDate}");

                if (currentDate != null && currentDate?.Date < model.EntryTimestamp.Date)
                {
                    var reports = await _reportService.GetReportsAsync();
                    _logger.LogInformation($"Number of retrieved reports: {reports.Count}");

                    var response = await _eployeeStoreService.SendDailyReports(reports);
                    _logger.LogInformation($"Reports sent to EMPLOYEESTORESERVICE: {JsonConvert.SerializeObject(reports)}");
                    
                    if (response != null)
                    {
                        _logger.LogInformation($"Http Status Code:  {response?.StatusCode}, Content: {await response?.Content.ReadAsStringAsync()}");
                    }
                    else
                    {
                        _logger.LogInformation($"HttpResponseMesssage is null!");
                    }

                    await _reportService.DeleteReportsAsync();
                    _logger.LogInformation("Reports deleted from reportstore");

                    await _reportService.SetCurrentDateAsync(model.EntryTimestamp.Date);
                    _logger.LogInformation($"New date is set to reportstore: {model.EntryTimestamp.Date}");
                }
                else if (currentDate == null)
                {
                    await _reportService.SetCurrentDateAsync(model.EntryTimestamp.Date);
                    _logger.LogInformation($"New date is set to reportstore: {model.EntryTimestamp.Date}");
                }

                await _reportService.SaveReportAsync(model);

                _logger.LogInformation("Employee saved to reportstore.");

                return Ok();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "CollectionController.ReportAsync: Error occurred");
                return StatusCode(500);
            }
        }
    }
}
