using Dapr.Client;
using WorkingTimeControl.Proxies;
using WorkingTimeControl.Repositories;
using WorkingTimeControl.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var daprHttpPort = Environment.GetEnvironmentVariable("DAPR_HTTP_PORT") ?? "9080";
var daprGrpcPort = Environment.GetEnvironmentVariable("DAPR_GRPC_PORT") ?? "60000";

builder.Services.AddDaprClient(builder => builder
    .UseHttpEndpoint($"http://localhost:{daprHttpPort}")
    .UseGrpcEndpoint($"http://localhost:{daprGrpcPort}"));

builder.Services.AddSingleton<IReportRepository, ReportRepository>();
builder.Services.AddSingleton<IReportService, ReportService>();
builder.Services.AddSingleton<EmployeeStoreService>(_ =>
    new EmployeeStoreService(DaprClient.CreateInvokeHttpClient(
        "employeestoreservice", $"http://localhost:{daprHttpPort}")));

builder.Services.AddControllers().AddDapr();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// delete Redis cache
var reportRepository = app.Services.GetService<IReportRepository>();

await reportRepository?.DeleteReportsAsync();
Console.WriteLine("Reports deleted from Redis cache.");

await reportRepository?.DeleteCurrentDateAsync();
Console.WriteLine("Current date deleted from Redis cache.");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCloudEvents();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapSubscribeHandler();

app.Run("http://localhost:6001");
