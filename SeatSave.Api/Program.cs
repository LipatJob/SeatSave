using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using SeatSave.Api.Converters;
using SeatSave.EF;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        options.SerializerSettings.Converters.Add(new StringEnumConverter());
        options.SerializerSettings.Converters.Add(new DateOnlyJsonConverter());
        options.SerializerSettings.Converters.Add(new TimeOnlyJsonConverter());

    });

builder.Services.AddTransient<SeatSaveDbSeeder>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});
builder.Services.AddAuthorization();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { new OpenApiSecurityScheme{ Reference = new OpenApiReference
        {
            Id="Bearer",
            Type=ReferenceType.SecurityScheme
        }}, new List<string> ()}
    });

});

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<SeatSaveContext>(options =>
    {
        options.UseLazyLoadingProxies();
        var folder = Environment.SpecialFolder.Personal;
        var path = Environment.GetFolderPath(folder);
        var DbPath = System.IO.Path.Join(path, "SeatSave.db");
        options.UseSqlite(
            $"Data Source={DbPath}",
            e => e.MigrationsAssembly("SeatSave.Api"));
    });
}
if (builder.Environment.IsProduction())
{
    builder.Services.AddDbContext<SeatSaveContext>(options =>
    {
        var connectionString = builder.Configuration.GetConnectionString("SeatSaveDb");
        options.UseSqlServer(connectionString);
    });
}

var MyAllowSpecificOrigins = "AllowAll";
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: MyAllowSpecificOrigins,
        builder =>
        {
            builder.SetIsOriginAllowed(isOriginAllowed: _ => true).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
        });
});

var app = builder.Build();
if (args.Length == 1 && args[0].ToLower() == "seed") { SeedData(app); }
void SeedData(IHost app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();

    using (var scope = scopedFactory.CreateScope())
    {
        var service = scope.ServiceProvider.GetService<SeatSaveDbSeeder>();
        service.Seed();
    }
}



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();