# DevBlog

![Tela inicial do DevBlog](./public/img/Captura%20de%20ecrã%202025-05-17%20143022.png)

Um blog para desenvolvedores feito com Node.js, Express, MongoDB, Handlebars e Bootstrap.

## 🚀 Funcionalidades

- Cadastro e login de usuários
- CRUD de categorias e postagens
- Interface responsiva com tema escuro
- Sistema de autenticação com Passport.js
- Mensagens de sucesso e erro com Flash

## 🛠️ Tecnologias

- Node.js
- Express
- MongoDB + Mongoose
- Handlebars
- Bootstrap 5 (customizado)
- Passport.js

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/JoaoGomesDev32/blogapp.git
   cd blogapp

2. Instale as dependências:

    npm install

3. Inicie o MongoDB localmente.

4. Inicie o servidor:

    npm start

    ou, para desenvolvimento:

    nodemon app.js

5. Acesse em http://localhost:3000

## 👤 Usuário Admin

    Crie um usuário pelo registro e ajuste manualmente no banco de dados o campo eAdmin para 1 para acesso administrativo.

## 📂 Estrutura de Pastas

    blogapp/
    ├── config/
    ├── models/
    ├── public/
    │   └── css/
    ├── routes/
    ├── views/
    │   ├── admin/
    │   ├── layouts/
    │   └── partials/
    ├── app.js
    └── package.json

## Licença

    MIT