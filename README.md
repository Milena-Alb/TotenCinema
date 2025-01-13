# Totem de Cinema 🎥

O **Totem de Cinema** é uma aplicação web interativa dividida em duas partes principais: a parte de **administração** e a parte de **visualização para os clientes**. Na parte administrativa, é possível **adicionar**, **remover** ou **atualizar** as informações sobre os filmes. Já na parte do cliente, os usuários podem **visualizar** as informações dos filmes de forma simples e prática.

Este projeto foi desenvolvido utilizando **HTML**, **CSS**, **JavaScript** e **Node.js**, e tem como objetivo fornecer uma interface eficiente e agradável para o gerenciamento e a exibição de filmes em um cinema.

## Funcionalidades 🌟

### Admin:
- **Adicionar Filmes**: O administrador pode cadastrar novos filmes no sistema, preenchendo detalhes como nome, gênero, descrição, classificação, idioma e imagem de capa.
- **Atualizar Filmes**: O administrador pode editar as informações de um filme existente.
- **Remover Filmes**: O administrador pode excluir filmes do sistema.
- **Interface Simples**: O painel de administração possui uma interface fácil de usar, onde as opções de edição e visualização são claras.

### Cliente:
- **Exibição de Filmes**: Os clientes podem visualizar os filmes disponíveis no totem de cinema.
- **Informações Interativas**: Ao clicar na imagem de capa de um filme, o cliente pode ver as informações detalhadas sobre ele.
- **Botões de Navegação**: O cliente pode navegar entre os filmes e retornar facilmente à lista inicial.

## Tecnologias 🛠️
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js
- **Armazenamento de Dados**: `filme.json` para persistência das informações sobre os filmes.

## Instalação 🚀

### 1. Clone o Repositório

```bash
git clone https://github.com/Milena-Alb/TotenCinema.git
````

### 2. Instale as Dependências

Dentro do diretório do projeto, execute:

```bash
npm install
````
### 3. Inicie o Servidor
Para iniciar a aplicação, execute o seguinte comando:
```bash
npm start
````
Isso iniciará o servidor e a aplicação estará disponível no navegador em `http://localhost:3000`.

## Estrutura do Projeto 📁

O projeto possui a seguinte estrutura de pastas:
````bash
toten-de-cinema/
│
├── public/
│   ├── admin/
│   ├── totem/
│   └── script.js
│
├── uploads/                  # Pasta onde as imagens dos filmes são armazenadas
├── server.js                 # Arquivo principal do servidor Node.js
├── filme.json                # Armazena os dados dos filmes
├── package.json              # Dependências e configurações do projeto
└── README.md                 # Este arquivo
````
## Como Contribuir 💡
Se você deseja contribuir com o projeto, sinta-se à vontade para abrir issues ou enviar pull requests. As contribuições são sempre bem-vindas!
