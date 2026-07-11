# Multi-stage build for the ASP.NET Core Web API.
# Build:  docker build -t reforged-api -f server/ReforgedRecovery.Api/Dockerfile server/ReforgedRecovery.Api
# Run:    docker run -p 8080:8080 \
#           -e Database__Provider=Postgres \
#           -e ConnectionStrings__Default="Host=...;Database=...;Username=...;Password=..." \
#           -e Email__Provider=SendGrid -e Email__SendGridApiKey="SG.xxxx" \
#           reforged-api

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["ReforgedRecovery.Api.csproj", "./"]
RUN dotnet restore "ReforgedRecovery.Api.csproj"
COPY . .
RUN dotnet publish "ReforgedRecovery.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
# Bind to 8080 (non-root friendly). HTTPS/SSL is terminated at the platform's
# load balancer / reverse proxy in front of the container.
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ReforgedRecovery.Api.dll"]
