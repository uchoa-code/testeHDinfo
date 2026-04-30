# Teste HD Info - Gerenciador de Tarefas

Aplicação web fullstack para gerenciamento de tarefas, desenvolvida como parte de um desafio técnico para estágio Fullstack.

O sistema permite que usuários se cadastrem, façam login e gerenciem suas próprias tarefas de forma individual. Cada usuário visualiza apenas as tarefas que criou.

## Deploy

- Frontend: https://teste-h-dinfo.vercel.app
- Backend/API: https://testehdinfo.onrender.com

## Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Logout
- Criação de tarefas
- Listagem de tarefas
- Edição de tarefas
- Remoção de tarefas
- Marcar tarefa como concluída ou pendente
- Filtro por status:
  - Todas
  - Concluídas
  - Pendentes
- Feedback visual de sucesso, erro e carregamento
- Cada usuário acessa apenas suas próprias tarefas
- Interface responsiva com HTML, CSS e JavaScript puros

## Tecnologias utilizadas

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT
- SQLite
- django-cors-headers
- Gunicorn

### Frontend

- HTML5
- CSS3
- JavaScript
- Vercel

### Deploy

- Backend hospedado no Render
- Frontend hospedado no Vercel
- Código versionado no GitHub

## Estrutura do projeto

```txt
testeHDinfo/
│
├── backend/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── logout.html
│   ├── style.css
│   ├── script.js
│   ├── login.js
│   ├── register.js
│   └── logout.js
│
├── tasks/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   ├── auth_serializers.py
│   └── auth_views.py
│
├── manage.py
├── requirements.txt
├── .gitignore
└── README.md
```

## Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/uchoa-code/testeHDinfo.git
cd testeHDinfo
```

### 2. Crie e ative um ambiente virtual

No Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

No Linux/Mac:

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
SECRET_KEY=sua_chave_secreta
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
```

### 5. Rode as migrações

```bash
python manage.py migrate
```

### 6. Inicie o backend

```bash
python manage.py runserver
```

A API ficará disponível em:

```txt
http://127.0.0.1:8000/
```

## Como rodar o frontend localmente

Como o frontend usa HTML, CSS e JavaScript puros, basta abrir os arquivos da pasta `frontend/` no navegador.

Para evitar problemas de CORS ou carregamento local, também é possível usar uma extensão como Live Server no VS Code.

Arquivo principal:

```txt
frontend/index.html
```

Tela de login:

```txt
frontend/login.html
```

Tela de cadastro:

```txt
frontend/register.html
```

## Autenticação

O projeto utiliza autenticação via JWT.

### Cadastro

```http
POST /api/register/
```

Exemplo de corpo da requisição:

```json
{
  "username": "usuario",
  "email": "usuario@email.com",
  "password": "123456",
  "password_confirm": "123456"
}
```

### Login

```http
POST /api/token/
```

Exemplo de corpo da requisição:

```json
{
  "username": "usuario",
  "password": "123456"
}
```

Exemplo de resposta:

```json
{
  "refresh": "token_refresh",
  "access": "token_access"
}
```

O token de acesso deve ser enviado nas requisições protegidas:

```http
Authorization: Bearer seu_token
```

## Rotas da API

### Tarefas

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| GET | `/api/tasks/` | Lista as tarefas do usuário logado | Sim |
| POST | `/api/tasks/` | Cria uma nova tarefa | Sim |
| GET | `/api/tasks/:id/` | Busca uma tarefa específica | Sim |
| PATCH | `/api/tasks/:id/` | Atualiza uma tarefa | Sim |
| DELETE | `/api/tasks/:id/` | Remove uma tarefa | Sim |
| PATCH | `/api/tasks/:id/completed/` | Atualiza apenas o status da tarefa | Sim |

### Filtros

Listar tarefas concluídas:

```http
GET /api/tasks/?completed=true
```

Listar tarefas pendentes:

```http
GET /api/tasks/?completed=false
```

## Modelo de tarefa

```json
{
  "id": "uuid",
  "title": "Título da tarefa",
  "description": "Descrição da tarefa",
  "completed": false,
  "createdAt": "2026-04-30T12:00:00Z",
  "updatedAt": "2026-04-30T12:00:00Z"
}
```

## Regras de negócio

- O usuário precisa estar autenticado para acessar as tarefas.
- Cada usuário só visualiza, edita e remove as próprias tarefas.
- O título precisa ter no mínimo 3 caracteres.
- A descrição precisa ter no mínimo 5 caracteres.
- O campo `completed` indica se a tarefa está concluída ou pendente.

## Deploy

### Backend - Render

O backend está hospedado no Render.

Comando de inicialização usado:

```bash
python manage.py migrate && gunicorn backend.wsgi:application
```

Variáveis de ambiente necessárias no Render:

```env
SECRET_KEY=sua_chave_secreta
DEBUG=False
ALLOWED_HOSTS=testehdinfo.onrender.com
```

### Frontend - Vercel

O frontend está hospedado na Vercel.

Como o frontend é feito com HTML, CSS e JavaScript puros, não é necessário build.

Configuração sugerida:

```txt
Framework Preset: Other
Build Command: vazio
Output Directory: frontend
```

## Status do projeto

Projeto funcional com backend e frontend integrados.

Funcionalidades principais implementadas:

- CRUD de tarefas
- Autenticação JWT
- Cadastro de usuários
- Isolamento de tarefas por usuário
- Filtros
- Feedback visual
- Deploy do frontend
- Deploy do backend

## Melhorias futuras

- Refresh automático do token JWT
- Testes automatizados no backend
- Testes no frontend
- Paginação de tarefas
- Busca por título
- Confirmação antes de deletar tarefa
- Docker
- Banco PostgreSQL em produção
- Melhorias visuais na interface

## Autor

Desenvolvido por João Pedro Uchoa.
