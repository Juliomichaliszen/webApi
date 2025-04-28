# Documentação da API - Sistema de Gerenciamento de Consultas Médicas

## Visão Geral
Essa é uma aplicação Web API desenvolvida em ASP.NET Core 8 com autenticação JWT, banco de dados SQLite e arquitetura minimalista utilizando o Entity Framework Core. Ela permite o gerenciamento de pacientes, médicos e consultas.

---

## Configuração e Execução

### Requisitos:
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [SQLite CLI (opcional para inspeção manual do banco)](https://www.sqlite.org/download.html)

### Instalação de Pacotes Necessários:
Execute este comando na raiz do projeto para instalar os pacotes obrigatórios:

```bash
 dotnet add package Microsoft.EntityFrameworkCore.Sqlite
 dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.0
 dotnet add package Swashbuckle.AspNetCore
```
### Primeira vez rodando e não tem Migrations ? 

```bash
 dotnet tool install --global dotnet-ef
 dotnet ef migrations add InitialCreate
 dotnet ef database update
```

### Executando a aplicação:
```bash
 dotnet run
```
A aplicação estará disponível normalmente em: `https://localhost:5235` ou no endereço que o shell retornar

---

## Estrutura de Pastas

```
App/
Data/               --> Contém o DbContext e configurações do banco
Migrations/          --> Arquivo que contem as migrations do Banco de dados gerados pelo entity Framework
Models/             --> Contém as classes da camada de domínio (Paciente, Medico, etc)
Utils/              --> Contém classes auxiliares (TokenService)
Program.cs          --> Arquivo principal com todos os endpoints
```

---

## Autenticação JWT

Autenticação baseada em token JWT:
- Endpoint de login: `/login`
- Endpoint de registro: `/register`
- Após autenticação, é retornado um token JWT
- Utilize o token no `Authorization Header` com o prefixo `Bearer` para acessar as demais rotas protegidas.

**Exemplo de Header:**
```http
Authorization: Bearer seu_token_jwt
```

---

## Endpoints Disponíveis

### Auth
- `POST /login` - Login do usuário
- `POST /register` - Cria novo usuário

### Pacientes
- `GET /getPacientes` - Lista todos os pacientes
- `GET /getPacientes/{id}` - Retorna paciente por ID
- `POST /createPaciente` - Cria um novo paciente
- `PUT /updatePaciente/{id}` - Atualiza um paciente
- `DELETE /deletePaciente/{id}` - Remove um paciente

### Médicos
- `GET /getMedicos` - Lista todos os médicos
- `GET /getMedicos/{id}` - Retorna médico por ID
- `POST /createMedico` - Cria novo médico
- `PUT /updateMedico/{id}` - Atualiza um médico
- `DELETE /deleteMedico/{id}` - Remove um médico

### Consultas
- `GET /getConsultas` - Lista todas as consultas com detalhes de Paciente e Médico
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

## Explicação do Program.cs

- **AddDbContext**: configura o SQLite com nome do banco `consultas.db`
- **AddAuthentication**: ativa autenticação JWT
- **MapPost/MapGet/etc**: define os endpoints da API
- **UseSwagger**: habilita a documentação interativa da API em `/swagger`
- **Tratamento de Erros**: erros de validação e not found são tratados com mensagens claras

---

## Swagger UI
Disponível em: `http://localhost:5235/swagger`
Permite testar todas as rotas da aplicação com ou sem autenticação.


