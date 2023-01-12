using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;
using MQTTnet;
using MQTTnet.Client;
using CameraSimulation.Events;
using Newtonsoft.Json;

namespace CameraSimulation.BackgroundServices
{
    public class BackgroundDataSender : IHostedService
    {
        private ILogger<BackgroundDataSender> _logger;
        IMqttClient _client;

        public BackgroundDataSender(ILogger<BackgroundDataSender> logger)
        {
            _logger = logger;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("CameraSimulation.BackgroundService running.");

            var mqttFactory = new MqttFactory();

            _client = mqttFactory.CreateMqttClient();

            var options = new MqttClientOptionsBuilder()
                .WithTcpServer("localhost", 1883)
                .Build();

            await _client.ConnectAsync(options);

            if (_client.IsConnected)
            {
                _logger.LogInformation("CameraSimulation.BackgroundService connected to MQTT");

                while (true)
                {
                    var entryCam = new EmployeeRegistered
                    {
                        EmployeeId = Guid.NewGuid().ToString(),
                        Timestamp = DateTime.Now,
                    };

                    var eventJson = JsonConvert.SerializeObject(entryCam);
                    await PublishMessage(eventJson);

                    Thread.Sleep(20000);
                }
            }
            else
            {
                _logger.LogInformation("CameraSimulation.BackgroundService not connected to MQTT");
            }
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("CameraSimulation.BackgroundService is stopping.");
            _client?.Dispose();
        }

        private async Task PublishMessage(string messagePayload)
        {
            var message = new MqttApplicationMessageBuilder()
                .WithTopic("demo-camera-simulation")
                .WithPayload(messagePayload)
                .Build();

            if (_client.IsConnected)
            {
                await _client.PublishAsync(message);
                _logger.LogInformation("CameraSimulation.BackgroundService Message: {0} is sent!", messagePayload);
            }
            else
            {
                _logger.LogInformation("CameraSimulation.BackgroundService MQTT client is not connected, Message: {0} is not sent!", messagePayload);
            }
        }
    }
}
