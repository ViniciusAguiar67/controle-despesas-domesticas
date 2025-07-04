# 💰 Controle de Despesas Domésticas
Sistema completo para controle de despesas e orçamento doméstico, com API REST no back-end e interface web no front-end.

## 🧰 Tecnologias Utilizadas

- Node.js v22.17.0
- MySQL v9.1.0

### Frontend

- Next.js v15.3.4 

## ✨ Instruções para subir a aplicação

### 🔧 Backend

1. **Acesse a pasta do back-end:**

```bash```
cd backend

2. **Instale as dependências:**

- yarn

- npm install

3. **Crie um arquivo .env na raiz da pasta backend com o seguinte conteúdo:**

<pre> ```env PORT=3000 DATABASE_HOST=localhost DATABASE_PORT=3306 DATABASE_NAME=controle_despesas DATABASE_USERNAME=root DATABASE_PASSWORD= ``` </pre>

💡 Certifique-se de que o banco de dados esteja rodando e com as credenciais acima ou altere conforme necessário.

4. **Inicie o servidor:**

- yarn dev

- npm run dev

#### 🌐 Frontend

1. **Acesse a pasta do front-end:**

```bash```
cd frontend

2. **Instale as dependências:**

- yarn

- npm install

3. **Gere a build necessária do Next.js:**

- yarn build

- npm run build

4. **Inicie o servidor de desenvolvimento:**

- yarn dev

- npm run dev

# 📝 Observações

- O back-end expõe uma API RESTful com endpoints para controle de despesas.

- O front-end consome essa API e exibe uma interface interativa e responsiva.

- É recomendável utilizar Node.js na mesma versão especificada para garantir compatibilidade.
