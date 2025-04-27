// Dependencias
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using App.Data;
using App.Models;
using App.Utils;
// Builder
var builder = WebApplication.CreateBuilder(args);

// Adicionando o DbContext e definindo o banco para sqlite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=MedCare.db"));
// Autentica��o com token JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "WebAPI",
            ValidAudience = "WebAPI",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("asdcasdcasdcasdcasdcasdcasdcasdc"))
            // Hash para poder gerar o token JWT
        };
    });
// Authorization service e configurando o swagger, para poder ter uma UI da API
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Inicializando o APP com o build
var app = builder.Build();
// Swagger no app
app.UseSwagger();
app.UseSwaggerUI();
// Autentica��o e autoriza��o
app.UseAuthentication();
app.UseAuthorization();

// Definindo os Endpoints de autentica��o no app
app.MapPost("/login", async (Usuario login, AppDbContext db) =>
{
    var usuario = await db.Usuarios
        .FirstOrDefaultAsync(u => u.Username == login.Username && u.Password == login.Password);

    if (usuario is null) return Results.Unauthorized();

    var token = TokenService.GenerateToken(usuario);
    return Results.Ok(new { token });
});

app.MapPost("/register", async (Usuario novoUsuario, AppDbContext db) =>
{
    db.Usuarios.Add(novoUsuario);
    await db.SaveChangesAsync();

    var token = TokenService.GenerateToken(novoUsuario);
    return Results.Ok(new { token });
});

// Rodando :)
app.Run();