
# BrincaJá - API Flask

Esta é a API backend para o sistema de aluguel de brinquedos BrincaJá.

## Configuração

1. Instale as dependências:
   ```
   pip install -r requirements.txt
   ```

2. Execute o servidor Flask:
   ```
   python app.py
   ```

3. O servidor estará disponível em `http://localhost:5000`

## Rotas da API

### Autenticação
- `POST /api/registar` - Registar um novo usuário
- `POST /api/login` - Iniciar sessão

### Planos e Brinquedos
- `GET /api/planos` - Obter todos os planos de assinatura
- `GET /api/brinquedos` - Obter brinquedos disponíveis

### Perfil e Assinaturas
- `GET /api/perfil` - Obter o perfil do usuário e assinaturas ativas
- `POST /api/checkout` - Criar uma nova assinatura

## Banco de Dados

O sistema utiliza SQLite como banco de dados. O arquivo `brinquedos.db` será criado automaticamente na primeira execução.
