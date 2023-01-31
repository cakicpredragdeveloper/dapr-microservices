using CameraDataCalculation.Events;
using Dapr.Client;

namespace CameraDataCalculation.RabbitMq
{
    public class RabbitMqService : IRabbitMqService
    {
        private readonly DaprClient _daprClient;

        public RabbitMqService(DaprClient daprClient)
        {
            _daprClient = daprClient;
        }

        public async Task<bool> PublishEventAsync(InsufficientWorkingHours workingHoursEvent)
        {
            try
            {
                await _daprClient.PublishEventAsync<InsufficientWorkingHours>("pubsub", "insufficient-working-hours", workingHoursEvent);
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
