using CameraDataCalculation.Events;
using CameraDataCalculation.Helpers;
using CameraDataCalculation.Models;
using CameraDataCalculation.RabbitMq;
using CameraDataCalculation.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CameraDataCalculation.Controllers
{
    [ApiController]
    [Route("")]
    public class EmployeeController : ControllerBase
    {
        #region Private fields

        private readonly ILogger<EmployeeController> _logger;
        private readonly IEmployeeStateService _employeeService;
        private readonly IWorkingTimeCalculator _workingTimeCalculator;
        private readonly IRabbitMqService _rabbitMqService;

        #endregion

        #region Constructors

        public EmployeeController(ILogger<EmployeeController> logger, IEmployeeStateService employeeStateService,
            IWorkingTimeCalculator workingTimeCalculator, IRabbitMqService rabbitMqService)
        {
            _logger = logger;
            _employeeService = employeeStateService;
            _workingTimeCalculator = workingTimeCalculator;
            _rabbitMqService = rabbitMqService;
        }

        #endregion

        #region Public methods

        [HttpPost("entrycam")]
        public async Task<IActionResult> EmployeeEntryAsync([FromBody] EmployeeRegistered msg)
        {
            try
            {
                _logger.LogInformation($"\n\n\nEmployeeController.EmployeeEntryAsync: " +
                    $"Employee {msg.EmployeeId} detected at {msg.Timestamp.ToString()}.");

                var employeeState = new EmployeeState(msg.EmployeeId, msg.Timestamp);
                await _employeeService.SaveEmployeeStateAsync(employeeState);

                _logger.LogInformation($"EmployeeController.EmployeeEntryAsync: " +
                     $"Employee {msg.EmployeeId} stored to statestore.");

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "EmployeeController.EmployeeEntryAsync: Error occurred while processing ENTRY");
                return StatusCode(500);
            }
        }

        [HttpPost("exitcam")]
        public async Task<IActionResult> EmployeeExitAsync([FromBody] EmployeeRegistered msg)
        {
            try
            {
                var employeeState = await _employeeService.GetEmployeeStateAsync(msg.EmployeeId);

                if (employeeState == null)
                {
                    return NotFound("Employee not found");
                }

                _logger.LogInformation($"\n\n\nEmployeeController.EmployeeExitAsync: " +
                    $"EXIT detected at {msg.Timestamp.ToString()} of employee with id {msg.EmployeeId}.");

                var workingTimeStats = _workingTimeCalculator.CalculateWorkingTime(employeeState.EmployeeId, 
                    employeeState.EntryTimestamp, msg.Timestamp);
                
                _logger.LogInformation($"EmployeeController.EmployeeExitAsync: " +
                    $"Employee: {msg.EmployeeId} STATS: IsValid: {workingTimeStats.IsValid}, " +
                    $"EntryTime: {employeeState.EntryTimestamp.ToString()} WorkingTime: {workingTimeStats.WorkingTime.ToString()}");

                if (workingTimeStats.IsValid == false)
                {
                    var workintTimeEvent = new InsufficientWorkingHours()
                    {
                        EmployeeId = employeeState.EmployeeId,
                        EntryTimestamp = employeeState.EntryTimestamp,
                        ExitTimestamp = msg.Timestamp,
                        WorkingTime = workingTimeStats.WorkingTime
                    };

                    await _rabbitMqService.PublishEventAsync(workintTimeEvent);
                    _logger.LogInformation($"EmployeeController.EmployeeExitAsync: Event published to topic! Message: {JsonConvert.SerializeObject(workintTimeEvent)}");

                    await _employeeService.DeleteEmployeeStateAsync(msg.EmployeeId);
                    _logger.LogInformation($"EmployeeController.EmployeeExitAsync: Employee {msg.EmployeeId} deleted from statestore!");
                }

               return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "EmployeeController.EmployeeExitAsync: Error occurred while processing ENTRY");
                return StatusCode(500);
            }
        }
        #endregion
    }
}
