namespace CameraDataCalculation.Models
{
    public class EmployeeState
    {
        public string EmployeeId { get; set; }
        public DateTime EntryTimestamp { get; set; }

        public EmployeeState(string employeeId, DateTime entryTimestamp)
        {
            EmployeeId = employeeId;
            EntryTimestamp = entryTimestamp;
        }
    }
}
