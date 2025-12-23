# 📚 Bookstore - Sistema de Livraria com Arquitetura de Microserviços

Sistema de gerenciamento de livraria desenvolvido com **NestJS** utilizando arquitetura de microserviços. O projeto demonstra a comunicação entre serviços através de TCP e o padrão de API Gateway para centralizar as requisições.

## 🏗️ Arquitetura

O projeto é organizado em um **monorepo** contendo:

### 📦 Aplicações (apps/)

1. **bookstore-api-gateway** (Porta: 3000)
   - API Gateway REST que centraliza todas as requisições
   - Comunica-se com os microserviços via TCP
   - Expõe endpoints HTTP para o cliente
   - Gerencia a orquestração entre os serviços

2. **books** (Porta: 3002)
   - Microserviço responsável pelo gerenciamento de livros
   - Comunicação via TCP com padrão de Message Patterns
   - CRUD completo de livros (Create, Read, Update, Delete)
   - Armazena dados em memória

3. **users** (Porta: 3001)
   - Microserviço responsável pelo gerenciamento de usuários
   - Comunicação via TCP
   - Listagem de usuários
   - Armazena dados em memória

### 📚 Bibliotecas Compartilhadas (libs/)

- **contracts**: Biblioteca compartilhada contendo DTOs, padrões de mensagens e interfaces comuns entre os serviços

## 🚀 Tecnologias Utilizadas

- **NestJS** ^11.0.1 - Framework Node.js para construir aplicações server-side eficientes
- **TypeScript** ^5.7.3 - Superset tipado de JavaScript
- **@nestjs/microservices** ^11.1.10 - Módulo de microserviços do NestJS
- **@nestjs/config** ^4.0.2 - Gerenciamento de configurações
- **class-validator** ^0.14.3 - Validação de dados
- **class-transformer** ^0.5.1 - Transformação de objetos
- **RxJS** ^7.8.1 - Programação reativa
- **Jest** ^30.0.0 - Framework de testes

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## ⚙️ Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório do projeto
cd bookstore

# Instale as dependências
npm install
```

## 🔧 Configuração

O projeto utiliza variáveis de ambiente para configurar as portas dos microserviços. Crie um arquivo `.env` na raiz do projeto:

```env
# Portas dos microserviços
BOOKS_CLIENT_PORT=3002
USERS_CLIENT_PORT=3001
```

## 🏃 Como Executar

### Executar todos os serviços em modo desenvolvimento

É necessário executar cada serviço em um terminal separado:

```bash
# Terminal 1 - API Gateway
npm run start:dev bookstore-api-gateway

# Terminal 2 - Microserviço de Livros
npm run start:dev books

# Terminal 3 - Microserviço de Usuários
npm run start:dev users
```

### Executar em modo produção

```bash
# Build do projeto
npm run build

# Executar serviços
npm run start:prod
```

## 📡 API Endpoints

### 📖 Books (através do API Gateway)

Base URL: `http://localhost:3000`

#### Criar um livro

```http
POST /books
Content-Type: application/json

{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "rating": 4.8
}
```

#### Listar todos os livros

```http
GET /books
```

#### Buscar um livro por ID

```http
GET /books/:id
```

#### Atualizar um livro

```http
PATCH /books/:id
Content-Type: application/json

{
  "title": "Clean Code - Updated",
  "author": "Robert C. Martin",
  "rating": 4.9
}
```

#### Deletar um livro

```http
DELETE /books/:id
```

### 👥 Users (através do API Gateway)

#### Listar todos os usuários

```http
GET /users
```

## 🔌 Comunicação entre Microserviços

O projeto utiliza o protocolo **TCP** para comunicação entre os serviços, através do padrão de **Message Patterns** do NestJS.

### Padrões de Mensagens (Books)

```typescript
- 'books.create'   - Criar novo livro
- 'books.findAll'  - Listar todos os livros
- 'books.findOne'  - Buscar livro por ID
- 'books.update'   - Atualizar livro
- 'books.remove'   - Remover livro
```

### Exemplo de Fluxo

1. Cliente faz requisição HTTP para o API Gateway
2. API Gateway transforma a requisição HTTP em uma mensagem TCP
3. API Gateway envia mensagem para o microserviço apropriado
4. Microserviço processa a mensagem e retorna a resposta
5. API Gateway retorna a resposta HTTP ao cliente

## 📁 Estrutura do Projeto

```
bookstore/
├── apps/
│   ├── bookstore-api-gateway/     # API Gateway REST
│   │   └── src/
│   │       ├── books/              # Módulo de livros do gateway
│   │       ├── users/              # Módulo de usuários do gateway
│   │       ├── client-config/      # Configuração dos clientes TCP
│   │       └── main.ts
│   ├── books/                      # Microserviço de livros
│   │   └── src/
│   │       └── books/
│   │           ├── dto/            # Data Transfer Objects
│   │           ├── books.controller.ts
│   │           └── books.service.ts
│   └── users/                      # Microserviço de usuários
│       └── src/
│           ├── dto/
│           ├── users.controller.ts
│           └── users.service.ts
├── libs/
│   └── contracts/                  # Biblioteca compartilhada
│       └── src/
│           └── books/
│               ├── book.dto.ts
│               ├── create-book.dto.ts
│               ├── update-book.dto.ts
│               └── books.patterns.ts
├── nest-cli.json                   # Configuração do NestJS CLI
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Testes de cobertura
npm run test:cov

# Testes e2e
npm run test:e2e
```

## 🔍 Linting e Formatação

```bash
# Executar linter
npm run lint

# Formatar código
npm run format
```

## 📦 Build

```bash
# Build de produção
npm run build
```

## 🎯 Exemplos de Uso

### Criar um livro com cURL

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Domain-Driven Design",
    "author": "Eric Evans",
    "rating": 4.5
  }'
```

### Listar todos os livros com cURL

```bash
curl http://localhost:3000/books
```

### Buscar um livro específico

```bash
curl http://localhost:3000/books/1
```

## 🔐 Segurança

⚠️ **Nota**: Este projeto é apenas para fins educacionais. Em produção, considere implementar:

## 📝 Licença

Este projeto está sob a licença UNLICENSED.

## 👨‍💻 Desenvolvimento

### Adicionar novo microserviço

```bash
nest generate app nome-do-servico
```

### Adicionar nova biblioteca

```bash
nest generate library nome-da-biblioteca
```

### Adicionar novo módulo

```bash
nest generate module nome-do-modulo
```

## 📚 Recursos Úteis

- [Documentação do NestJS](https://docs.nestjs.com)
- [NestJS Microservices](https://docs.nestjs.com/microservices/basics)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Desenvolvido com ❤️ usando NestJS**

# bookstore-nestjs
