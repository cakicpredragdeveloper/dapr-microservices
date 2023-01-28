using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;
using MQTTnet;
using MQTTnet.Client;
using CameraSimulation.Events;
using Newtonsoft.Json;
using System.IO;
using CameraSimulation.Models;
using System.Collections.Generic;

namespace CameraSimulation.BackgroundServices
{
    public class BackgroundDataSender : IHostedService
    {
        #region Constants

        const string _ENTRY_CAM_TOPIC = "demo-camera-entrycam";
        const string _EXIT_CAM_TOPIC = "demo-camera-exitcam";

        #endregion

        #region Private fields

        private ILogger<BackgroundDataSender> _logger;
        IMqttClient _client;
        List<Employee> _employees;

        #endregion

        #region Constructors

        public BackgroundDataSender(ILogger<BackgroundDataSender> logger)
        {
            _logger = logger;
        }

        #endregion

        #region Public methods

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation("CameraSimulation.BackgroundService.StartAsync: Background service is running.");

                await InitializeMqttConnectionAsync();

                if (_client.IsConnected)
                {
                    _logger.LogInformation("CameraSimulation.BackgroundService.StartAsync:  Connected to MQTT");

                    ReadDataFromJsonFile();

                    Random random = new Random();
                    DateTime baseDate = DateTime.Now;
                    
                    while (true)
                    {

                        #region Send entryCam events

                        foreach (var employee in _employees)
                        {
                            int entryCamHours = random.Next(8, 12);
                            int entryCamMinutes = random.Next(0, 60);
                            int entryCamSeconds = random.Next(0, 60);

                            employee.EntryTimeStamp = new DateTime(baseDate.Year, baseDate.Month, baseDate.Day,
                                    entryCamHours, entryCamMinutes, entryCamSeconds);

                            var entryCam = new EmployeeRegistered()
                            {
                                EmployeeId = employee.EmployeeId,
                                Timestamp = employee.EntryTimeStamp,
                            };

                            var messagePayload = JsonConvert.SerializeObject(entryCam);
                            await PublishMessageAsync(messagePayload, _ENTRY_CAM_TOPIC);

                            Thread.Sleep(5000);
                        }

                        #endregion

                        #region Send exitCam events

                        foreach (var employee in _employees)
                        {
                            int exitCamHours = employee.EntryTimeStamp.Hour + random.Next(7, 9);
                            int exitCamMinutes = random.Next(0, 60);
                            int exitCamSeconds = random.Next(0, 60);

                            var exitCam = new EmployeeRegistered()
                            {
                                EmployeeId = employee.EmployeeId,
                                Timestamp = new DateTime(baseDate.Year, baseDate.Month, baseDate.Day,
                                    exitCamHours, exitCamMinutes, exitCamSeconds),
                            };

                            var messagePayload = JsonConvert.SerializeObject(exitCam);
                            await PublishMessageAsync(messagePayload, _EXIT_CAM_TOPIC);

                            Thread.Sleep(5000);
                        }

                        #endregion
                    
                        Thread.Sleep(65000);

                        baseDate = baseDate.AddDays(1);
                    }
                }
                else
                {
                    _logger.LogInformation("CameraSimulation.BackgroundService.StartAsync: Not connected to MQTT");
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("CameraSimulation.BackgroundService.StopAsync: Background service is stopping.");
            _client?.Dispose();
        }

        #endregion

        #region Private methods

        private async Task InitializeMqttConnectionAsync()
        {
            try
            {
                _logger.LogInformation("CameraSimulation.BackgroundService.InitializeMqttConnectionAsync: " +
                    "Initializing Mqtt connection.");

                var mqttFactory = new MqttFactory();

                _client = mqttFactory.CreateMqttClient();

                var options = new MqttClientOptionsBuilder()
                    .WithTcpServer("localhost", 1883)
                    .Build();

                await _client.ConnectAsync(options);
            }
            catch(Exception)
            {
                throw;
            }
        }

        private void ReadDataFromJsonFile()
        {
            try
            {
                _logger.LogInformation("CameraSimulation.BackgroundService.ReadDataFromJsonFile: " +
                    "Reading data from json file.");

                string text = File.ReadAllText(@"./Employees.json");
                var employees1 = JsonConvert.DeserializeObject<List<Employee>>(text);
                _employees = new List<Employee>();

                for (int i = 0; i < 10; i++)
                {
                    _employees.Add(employees1[i]);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private async Task PublishMessageAsync(string messagePayload, string topic)
        {
            try
            {
                _logger.LogInformation("CameraSimulation.BackgroundService.PublishMessageAsync: " +
                    "Publishing message to topic");

                var message = new MqttApplicationMessageBuilder()
                    .WithTopic(topic)
                    .WithPayload(messagePayload)
                    .Build();

                if (_client.IsConnected)
                {
                    await _client.PublishAsync(message);

                    _logger.LogInformation("CameraSimulation.BackgroundService.PublishMessageAsync: " +
                        "Message: {0} is sent!", messagePayload);
                }
                else
                {
                    _logger.LogInformation("CameraSimulation.BackgroundService.PublishMessageAsync: " +
                        "MQTT client is not connected, Message: {0} is not sent!", messagePayload);
                }
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        #endregion
    }
}
