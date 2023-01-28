using CameraDataCalculation.Models;

namespace CameraDataCalculation.Helpers
{
    public class WorkingTimeCalculator : IWorkingTimeCalculator
    {
        public WorkingTimeStats CalculateWorkingTime(string employeeId, DateTime entryTime, DateTime exitTime)
        {
            var workingTime = exitTime - entryTime;
            var entryMinTime = new TimeSpan(8, 0, 0);
            var entryMaxTime = new TimeSpan(10, 0, 0);

            var IsValid = entryTime.TimeOfDay >= entryMinTime && entryTime.TimeOfDay <= entryMaxTime 
                          && workingTime.TotalHours >= 7.75
                          ? true : false;

            var stats = new WorkingTimeStats()
            {
                WorkingTime = workingTime,
                IsValid = IsValid
            };
            
            return stats;
        }
    }
}
