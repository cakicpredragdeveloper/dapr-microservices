FROM mcr.microsoft.com/dotnet/sdk:6.0-bullseye-slim AS build-env
WORKDIR /app

# Copy necessary files and restore as distinct layer
COPY CameraDataCalculation.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out CameraDataCalculation.csproj

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0-bullseye-slim
COPY --from=build-env /app/out .

# Expose ports
EXPOSE 6000/tcp
ENV ASPNETCORE_URLS http://*:6000

# Start
ENTRYPOINT ["dotnet", "CameraDataCalculation.dll"]
