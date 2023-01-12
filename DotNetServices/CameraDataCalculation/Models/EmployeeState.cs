namespace CameraDataCalculation.Models
{
    public class EmployeeState
    {
        public string EmployeeId { get; init; }
        public DateTime EntryTimestamp { get; init; }
        public DateTime? ExitTimestamp { get; init; }

        public EmployeeState(string employeeId, DateTime entryTimestamp, DateTime? exitTimestamp = null)
        {
            EmployeeId = employeeId;
            EntryTimestamp = entryTimestamp;
            ExitTimestamp = exitTimestamp;
        }
    }
}
