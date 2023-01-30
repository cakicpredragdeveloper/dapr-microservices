using CameraDataCalculation.Helpers;
using CameraDataCalculation.RabbitMq;
using CameraDataCalculation.Repositories;
using CameraDataCalculation.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<IWorkingTimeCalculator, WorkingTimeCalculator>();
builder.Services.AddSingleton<IRabbitMqService, RabbitMqService>();
builder.Services.AddSingleton<IEmployeeStateRepository, EmployeeStateRepository>(); 
builder.Services.AddSingleton<IEmployeeStateService, EmployeeStateService>();

var daprHttpPort = Environment.GetEnvironmentVariable("DAPR_HTTP_PORT") ?? "9080";
var daprGrpcPort = Environment.GetEnvironmentVariable("DAPR_GRPC_PORT") ?? "60000";

builder.Services.AddDaprClient(builder => builder
    .UseHttpEndpoint($"http://localhost:{daprHttpPort}")
    .UseGrpcEndpoint($"http://localhost:{daprGrpcPort}"));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Delete Redis cache
var employeeStateRepository = app.Services.GetService<IEmployeeStateRepository>();

await employeeStateRepository?.DeleteAllEmployeesAsync();
Console.WriteLine("Employee states deleted from Redis cache.");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run("http://localhost:6000");
