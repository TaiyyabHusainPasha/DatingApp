using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using API.Errors;
namespace API.Middelware
{
    public class ExceptionMiddelware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddelware> _loger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddelware(RequestDelegate next, ILogger<ExceptionMiddelware> loger, IHostEnvironment env)
        {
            _env = env;
            _loger = loger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try{
                await _next(context);
            }catch(Exception ex){
                _loger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.ContentType = ((int) HttpStatusCode.InternalServerError).ToString();

                var response = _env.IsDevelopment()
                    ? new ApiException(context.Response.StatusCode,ex.Message,ex.StackTrace?.ToString())
                    : new ApiException(context.Response.StatusCode,"Internal Server Error");

                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response,options);

                await context.Response.WriteAsync(json);
            }
            
        }
    }
}