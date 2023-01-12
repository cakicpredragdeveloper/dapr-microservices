using CameraDataCalculation.Events;
using CameraDataCalculation.Models;
using CameraDataCalculation.Services;
using Microsoft.AspNetCore.Mvc;

namespace CameraDataCalculation.Controllers
{
    [ApiController]
    [Route("")]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;
        private readonly IEmployeeStateService _employeeService;

        public EmployeeController(ILogger<EmployeeController> logger, IEmployeeStateService employeeStateService)
        {
            _logger = logger;
            _employeeService = employeeStateService;
        }

        [HttpPost("entrycam")]
        public async Task<IActionResult> EmployeeEntryAsync([FromBody] EmployeeRegistered msg)
        {
            try
            {
                _logger.LogInformation($"Employee {msg.EmployeeId} detected at {msg.Timestamp.ToString("hh:mm:ss")}.");

                var employeeState = new EmployeeState(msg.EmployeeId, msg.Timestamp, null);
                await _employeeService.SaveEmployeeStateAsync(employeeState);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while processing ENTRY");
                return StatusCode(500);
            }
        }
    }
}
