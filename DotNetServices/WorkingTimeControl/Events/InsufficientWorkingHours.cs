namespace WorkingTimeControl.Events
{
    public class InsufficientWorkingHours
    {
        public string EmployeeId { get; set; }
        public DateTime EntryTimestamp { get; set; }
        public DateTime ExitTimestamp { get; set; }
        public TimeSpan WorkingTime { get; set; }
    }
}
