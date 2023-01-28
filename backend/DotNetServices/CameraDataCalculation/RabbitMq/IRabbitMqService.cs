using CameraDataCalculation.Events;

namespace CameraDataCalculation.RabbitMq
{
    public interface IRabbitMqService
    {
        Task<bool> PublishEventAsync(InsufficientWorkingHours workingHoursEvent);
    }
}
