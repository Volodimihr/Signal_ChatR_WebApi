using Microsoft.EntityFrameworkCore;
using Signal_ChatR_WebApi.Hubs;
using System.Text.Json.Serialization;

namespace Signal_ChatR_WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<Signal_ChatR_WebApiContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("Signal_ChatR_WebApiContext") ?? throw new InvalidOperationException("Connection string 'Signal_ChatR_WebApiContext' not found.")));

            // Add services to the container.

            builder.Services.AddControllers().AddJsonOptions(
                options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
                );
            builder.Services.AddSignalR();
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder
                    .WithOrigins("http://localhost:5173")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
                    //.SetIsOriginAllowed(orign => true);
                });
            });

            builder.Services.AddDistributedMemoryCache();

            builder.Services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(5);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();

            app.MapControllers();

            app.UseCors();

            app.UseSession();

            app.MapHub<ChatHub>("/notify");

            app.Run();
        }
    }
}