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

// Consultas
app.MapGet("/getConsultas", async (AppDbContext db) =>
{
    try
    {
        var consultas = await db.Consultas.Include(c => c.Paciente).Include(c => c.Medico).ToListAsync();
        return Results.Ok(consultas);
    }
    catch (Exception ex) { return Results.Problem($"Erro ao buscar consultas: {ex.Message}"); }
}).RequireAuthorization();

app.MapPost("/createConsulta", async (Consulta consulta, AppDbContext db) =>
{
    try
    {
        var pacienteExiste = await db.Pacientes.AnyAsync(p => p.Id == consulta.PacienteId);
        var medicoExiste = await db.Medicos.AnyAsync(m => m.Id == consulta.MedicoId);

        if (!pacienteExiste || !medicoExiste)
        {
            return Results.BadRequest(new { mensagem = "Paciente ou M dico inv lido" });
        }

        db.Consultas.Add(consulta);
        await db.SaveChangesAsync();
        return Results.Created($"/consultas/{consulta.Id}", consulta);
    }
    catch (Exception ex) { return Results.BadRequest(new { mensagem = $"Erro ao criar consulta: {ex.Message}" }); }
}).RequireAuthorization();

app.MapGet("/getMedicos", async (AppDbContext db) =>
{
    try
    {
        var medicos = await db.Medicos.ToListAsync();
        return Results.Ok(medicos);
    }
    catch (Exception ex)
    {
        return Results.Problem($"Erro ao buscar m dicos: {ex.Message}");
    }
}).RequireAuthorization();

app.MapPost("/createMedico", async (Medico medico, AppDbContext db) =>
{
    try
    {
        db.Medicos.Add(medico);
        await db.SaveChangesAsync();
        return Results.Created($"/medicos/{medico.Id}", medico);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { mensagem = $"Erro ao criar m dico: {ex.Message}" });
    }
}).RequireAuthorization();

app.MapPut("/updateMedico/{id}", async (int id, Medico medicoAtualizado, AppDbContext db) =>
{
    try
    {
        var medico = await db.Medicos.FindAsync(id);
        if (medico == null) return Results.NotFound(new { mensagem = "M dico n o encontrado" });

        medico.Nome = medicoAtualizado.Nome;
        medico.Especialidade = medicoAtualizado.Especialidade;
        await db.SaveChangesAsync();
        return Results.Ok(medico);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { mensagem = $"Erro ao atualizar m dico: {ex.Message}" });
    }
}).RequireAuthorization();

app.MapDelete("/deleteMedico/{id}", async (int id, AppDbContext db) =>
{
    try
    {
        var medico = await db.Medicos.FindAsync(id);
        if (medico == null) return Results.NotFound(new { mensagem = "M dico n o encontrado" });

        db.Medicos.Remove(medico);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { mensagem = $"Erro ao deletar m dico: {ex.Message}" });
    }
}).RequireAuthorization();

// Rodando :)
app.Run();