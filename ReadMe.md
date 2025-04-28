# Documenta��o da API - Sistema de Gerenciamento de Consultas M�dicas

## Vis�o Geral
Essa � uma aplica��o Web API desenvolvida em ASP.NET Core 8 com autentica��o JWT, banco de dados SQLite e arquitetura minimalista utilizando o Entity Framework Core. Ela permite o gerenciamento de pacientes, m�dicos e consultas.

---

## Configura��o e Execu��o

### Requisitos:
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [SQLite CLI (opcional para inspe��o manual do banco)](https://www.sqlite.org/download.html)

### Instala��o de Pacotes Necess�rios:
Execute este comando na raiz do projeto para instalar os pacotes obrigat�rios:

```bash
 dotnet add package Microsoft.EntityFrameworkCore.Sqlite
 dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.0
 dotnet add package Swashbuckle.AspNetCore
```
### Primeira vez rodando e n�o tem Migrations ? 

```bash
 dotnet tool install --global dotnet-ef
 dotnet ef migrations add InitialCreate
 dotnet ef database update
```

### Executando a aplica��o:
```bash
 dotnet run
```
A aplica��o estar� dispon�vel normalmente em: `https://localhost:5235` ou no endere�o que o shell retornar

---

## Estrutura de Pastas

```
App/
Data/               --> Cont�m o DbContext e configura��es do banco
Migrations/          --> Arquivo que contem as migrations do Banco de dados gerados pelo entity Framework
Models/             --> Cont�m as classes da camada de dom�nio (Paciente, Medico, etc)
Utils/              --> Cont�m classes auxiliares (TokenService)
Program.cs          --> Arquivo principal com todos os endpoints
```

---

## Autentica��o JWT

Autentica��o baseada em token JWT:
- Endpoint de login: `/login`
- Endpoint de registro: `/register`
- Ap�s autentica��o, � retornado um token JWT
- Utilize o token no `Authorization Header` com o prefixo `Bearer` para acessar as demais rotas protegidas.

**Exemplo de Header:**
```http
Authorization: Bearer seu_token_jwt
```

---

## Endpoints Dispon�veis

### Auth
- `POST /login` - Login do usu�rio
- `POST /register` - Cria novo usu�rio

### Pacientes
- `GET /getPacientes` - Lista todos os pacientes
- `GET /getPacientes/{id}` - Retorna paciente por ID
- `POST /createPaciente` - Cria um novo paciente
- `PUT /updatePaciente/{id}` - Atualiza um paciente
- `DELETE /deletePaciente/{id}` - Remove um paciente

### M�dicos
- `GET /getMedicos` - Lista todos os m�dicos
- `GET /getMedicos/{id}` - Retorna m�dico por ID
- `POST /createMedico` - Cria novo m�dico
- `PUT /updateMedico/{id}` - Atualiza um m�dico
- `DELETE /deleteMedico/{id}` - Remove um m�dico

### Consultas
- `GET /getConsultas` - Lista todas as consultas com detalhes de Paciente e M�dico
- `GET /getConsultas/{id}` - Consulta por ID
- `POST /createConsulta` - Cria uma nova consulta
- `PUT /updateConsulta/{id}` - Atualiza uma consulta
- `DELETE /deleteConsulta/{id}` - Remove uma consulta

---

## Models

### Paciente
```csharp
public class Paciente {
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Cpf { get; set; }
    public DateOnly DataNascimento { get; set; }
}
```

### Medico
```csharp
public class Medico {
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Especialidade { get; set; }
}
```

### Consulta
```csharp
public class Consulta {
    public int Id { get; set; }
    public DateTime DataHora { get; set; }
    public int PacienteId { get; set; }
    public int MedicoId { get; set; }
}
```

---

## Explica��o do Program.cs

- **AddDbContext**: configura o SQLite com nome do banco `consultas.db`
- **AddAuthentication**: ativa autentica��o JWT
- **MapPost/MapGet/etc**: define os endpoints da API
- **UseSwagger**: habilita a documenta��o interativa da API em `/swagger`
- **Tratamento de Erros**: erros de valida��o e not found s�o tratados com mensagens claras

---

## Swagger UI
Dispon�vel em: `http://localhost:5235/swagger`
Permite testar todas as rotas da aplica��o com ou sem autentica��o.


