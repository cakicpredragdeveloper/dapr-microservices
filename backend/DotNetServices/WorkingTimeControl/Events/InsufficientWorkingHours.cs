using Newtonsoft.Json;

namespace WorkingTimeControl.Events
{
    public class InsufficientWorkingHours
    {
        [JsonProperty("EmployeeId")]
        public string EmployeeId { get; set; }

        [JsonProperty("EntryTimestamp")]
        public DateTime EntryTimestamp { get; set; }

        [JsonProperty("ExitTimestamp")]
        public DateTime ExitTimestamp { get; set; }

        [JsonProperty("WorkingTime")]
        public TimeSpan WorkingTime { get; set; }
    }
}
