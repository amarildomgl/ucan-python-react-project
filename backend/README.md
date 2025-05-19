# API de Aluguer de Brinquedos

Este projecto foi desenvolvido como trabalho académico para a cadeira de Comércio Electrónico da Universidade Católica de Angola (UCAN).

A API permite gerir aluguer de brinquedos infantis, com autenticação JWT, planos de subscrição e estrutura baseada em Clean Architecture e princípios SOLID.

---

## Objectivo

Simular um serviço onde utilizadores (pais, escolas, eventos) podem:

- Subscrever um plano mensal com limite de reservas;
- Fazer login;
- Cadastrar clientes e brinquedos;
- Realizar e consultar reservas.

---

## Tecnologias

- Python 3.8+
- Flask
- Flask SQLAlchemy
- Flask JWT Extended
- SQLite

---

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/aluguer-brinquedos-api.git
   cd aluguer-brinquedos-api
   ```
2. (Opcional) Crie ambiente virtual:

   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # Windows
   # ou
   source venv/bin/activate  # Linux/macOS
   ```
3. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

---

## Como Executar

```bash
python app.py
```

Aceda à API em: `http://localhost:5000/`

---

## Endpoints Principais

### Autenticação e Utilizadores

- `POST /usuarios/registro` — Registar novo utilizador

  - Body: `{ "nome", "email", "senha", "plano_id" }`
  - Resposta: `{ "msg", "id" }`
- `POST /usuarios/login` — Login e obtenção de token JWT

  - Body: `{ "email", "senha" }`
  - Resposta: `{ "access_token" }`

### Brinquedos

- `GET /brinquedos/` — Listar todos brinquedos

  - Resposta: lista de brinquedos
- `POST /brinquedos/` — Criar brinquedo

  - Body: `{ "nome", "descricao" }`
  - Resposta: `{ "id", "nome" }`

### Clientes

- `POST /clientes/` — Criar cliente
  - Body: `{ "nome", "contacto" }`
  - Resposta: `{ "id", "nome" }`

### Reservas (requer autenticação JWT)

- `POST /reservas/` — Criar reserva

  - Body: `{ "cliente_id", "brinquedo_id", "data_evento" }`
  - Resposta: `{ "id" }`
- `GET /reservas/` — Listar reservas do utilizador autenticado

  - Resposta: lista de reservas

---

> Para todos os endpoints protegidos, envie o token JWT no header: `Authorization: Bearer <token>`
