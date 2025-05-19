# Projecto de Comércio Electrónico

Este projecto é uma aplicação de comércio electrónico desenvolvida com uma arquitectura moderna, separando o backend (API) do frontend (interface do utilizador). O objectivo é permitir a gestão de brinquedos, clientes, reservas e planos, além da autenticação de utilizadores.

## Stack Tecnológica

### Backend (API)

- **Língua:** Python
- **Framework:** Flask
- **Base de Dados:** SQLite
- **Principais funcionalidades:**
  - CRUD de brinquedos, clientes, reservas e planos
  - Autenticação de utilizadores com JWT
  - Validação de dados
  - Arquitectura em camadas (entidades, repositórios, casos de uso, interfaces)

### Frontend (Interface)

- **Língua:** TypeScript
- **Framework:** React
- **Ferramenta de Build:** Vite
- **Estilização:** Tailwind CSS
- **Gestão de pacotes:** Bun
- **Principais funcionalidades:**
  - Interface moderna e responsiva
  - Páginas de checkout, perfil, FAQ, preços, depoimentos
  - Componentização e hooks personalizados

## Estrutura do Projecto

- `backend/`: Código-fonte do backend (API Flask, modelos, repositórios, serviços, etc.)
- `frontend/`: Código-fonte do frontend (React, componentes, páginas, configurações)

## Como Executar

### Backend

1. Instale as dependências:

   ```bash
   pip install -r backend/requirements.txt
   ```
2. Execute a API:

   ```bash
   python backend/app.py
   ```

### Frontend

1. Instale as dependências:

   ```bash
   npm install
   ```
2. Execute o frontend:

   ```bash
   npm run dev
   ```
