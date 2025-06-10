
# Sistema de Gerenciamento de Consultas Médicas

## Visão Geral

Essa é uma aplicação Web API desenvolvida em **ASP.NET Core 8** com autenticação **JWT**, banco de dados **SQLite** e arquitetura minimalista utilizando **Entity Framework Core**. Ela permite o gerenciamento de pacientes, médicos e consultas.  
A aplicação é composta por dois módulos:

- **Backend (API em ASP.NET Core)**
- **Frontend (Interface Web com React)**

---

## 🖥️ Backend (API)

### Requisitos:
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [SQLite CLI (opcional)](https://www.sqlite.org/download.html)

### Instalação de Pacotes Necessários:
Execute na raiz do projeto:

```bash
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.0
dotnet add package Swashbuckle.AspNetCore
```

### Primeira execução (sem migrations ainda):
```bash
dotnet tool install --global dotnet-ef
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Rodando a API:
```bash
dotnet run
```
A aplicação estará disponível em: `https://localhost:5235` (ou endereço retornado no terminal)

### Swagger UI:
Disponível em: `http://localhost:5235/swagger`  
Permite testar as rotas da API com ou sem autenticação.

---

## 🌐 Frontend (React)

### Requisitos:
- [Node.js](https://nodejs.org/) instalado (versão recomendada: 18.x ou superior)

### Passos para rodar a interface:

```bash
npm install
npm run dev
```

A aplicação estará rodando em: [http://localhost:3000](http://localhost:3000)

### Acessando o sistema:
Acesse [http://localhost:3000/login](http://localhost:3000/login) para visualizar a página de login.

---

## 📁 Estrutura de Pastas do Backend

```
App/
├── Data/         --> DbContext e configurações do banco
├── Migrations/   --> Migrations geradas pelo Entity Framework
├── Models/       --> Classes de domínio (Paciente, Medico, etc)
├── Utils/        --> Classes auxiliares (TokenService)
└── Program.cs    --> Arquivo principal com os endpoints
```

---

## 🔐 Autenticação JWT

A API utiliza autenticação JWT.

- Endpoint de login: `POST /login`
- Endpoint de registro: `POST /register`

Após autenticação, é retornado um token JWT que deve ser utilizado no header:

```http
Authorization: Bearer seu_token_jwt
```

---

## 📌 Endpoints Disponíveis

### Auth
- `POST /login`
- `POST /register`

### Pacientes
- `GET /getPacientes`
- `GET /getPacientes/{id}`
- `POST /createPaciente`
- `PUT /updatePaciente/{id}`
- `DELETE /deletePaciente/{id}`

### Médicos
- `GET /getMedicos`
- `GET /getMedicos/{id}`
- `POST /createMedico`
- `PUT /updateMedico/{id}`
- `DELETE /deleteMedico/{id}`

### Consultas
- `GET /getConsultas`
- `GET /getConsultas/{id}`
- `POST /createConsulta`
- `PUT /updateConsulta/{id}`
- `DELETE /deleteConsulta/{id}`

---

## 📦 Models (exemplos)

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
