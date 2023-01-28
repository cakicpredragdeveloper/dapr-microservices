using System;

namespace CameraSimulation.Models
{
    public  class Employee
    {
        public string EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string JobTitle { get; set; }
        public DateTime EntryTimeStamp { get; set; }
        public DateTime ExitTimeStamp { get; set; }
    }
}
