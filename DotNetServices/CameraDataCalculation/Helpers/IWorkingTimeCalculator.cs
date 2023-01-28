using CameraDataCalculation.Models;

namespace CameraDataCalculation.Helpers
{
    public interface IWorkingTimeCalculator
    {
        WorkingTimeStats CalculateWorkingTime(string employeeId, DateTime entryTime, DateTime exitTime);
    }
}
