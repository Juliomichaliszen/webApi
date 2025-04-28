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

// Pacientes
app.MapGet("/getPacientes", async (AppDbContext db) =>
{
    try { return Results.Ok(await db.Pacientes.ToListAsync()); }
    catch (Exception ex) { return Results.Problem($"Erro ao buscar pacientes: {ex.Message}"); }
}).RequireAuthorization();

app.MapPost("/createPaciente", async (Paciente paciente, AppDbContext db) =>
{
    try
    {
        db.Pacientes.Add(paciente);
        await db.SaveChangesAsync();
        return Results.Created($"/pacientes/{paciente.Id}", paciente);
    }
    catch (Exception ex) { return Results.BadRequest(new { mensagem = $"Erro ao criar paciente: {ex.Message}" }); }
}).RequireAuthorization();

app.MapPut("/updatePaciente/{id}", async (int id, Paciente updated, AppDbContext db) =>
{
    try
    {
        var paciente = await db.Pacientes.FindAsync(id);
        if (paciente == null) return Results.NotFound(new { mensagem = "Paciente n o encontrado" });

        paciente.Nome = updated.Nome;
        paciente.Cpf = updated.Cpf;
        paciente.DataNascimento = updated.DataNascimento;
        await db.SaveChangesAsync();
        return Results.Ok(paciente);
    }
    catch (Exception ex) { return Results.BadRequest(new { mensagem = $"Erro ao atualizar paciente: {ex.Message}" }); }
}).RequireAuthorization();

app.MapDelete("/deletePaciente/{id}", async (int id, AppDbContext db) =>
{
    try
    {
        var paciente = await db.Pacientes.FindAsync(id);
        if (paciente == null) return Results.NotFound(new { mensagem = "Paciente n o encontrado" });

        db.Pacientes.Remove(paciente);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    catch (Exception ex) { return Results.BadRequest(new { mensagem = $"Erro ao deletar paciente: {ex.Message}" }); }
}).RequireAuthorization();

// Rodando :)
app.Run();