# Coritiba Manager

Desenvolvedor: Emmanuel Antonietti Ribeiro dos Santos  
Turma: 5º A (Noite)  
Disciplina: Experiência Criativa

## Descrição do Projeto
O Coritiba Manager é um sistema web completo para gestão de elenco de futebol. O projeto consiste em um CRUD funcional que permite o controle de atletas, visualização tática da equipe, consulta de comissão técnica e calendário de partidas.

Este trabalho atende a todos os requisitos técnicos exigidos, incluindo a integração de Frontend em React, Backend em Node.js e Banco de Dados MySQL.

## Requisitos Atendidos

### 1. Frontend (React)
- Três telas principais: Listagem/CRUD, Ficha Técnica (Detalhes) e Calendário de Partidas.
- CRUD Completo: Cadastro, listagem, edição e exclusão de jogadores.
- Consumo de API: Utilização da biblioteca Axios para integração com o servidor.
- Interface do Usuário: Layout estruturado com CSS puro, utilizando Grid e Flexbox.
- Nome do Aluno: Nome visível de forma global no rodapé do sistema.

### 2. Backend (Node.js + Express)
- Endpoints RESTful: Implementação de rotas GET, POST, PUT e DELETE.
- CORS: Configurado para permitir a comunicação com o frontend.
- Arquitetura de Pastas: Organização modular dividida em routes, controllers e config.

### 3. Banco de Dados (MySQL)
- Tabela Relevante: Tabela jogadores com 6 campos (id, nome, posicao, numero_camisa, data_nascimento e pe_dominante).
- Conexão: Consultas realizadas via queries diretas com o pacote mysql2.
- Exportação SQL: Arquivo .sql incluso para reprodução do ambiente.

## Como Executar o Projeto

### 1. Banco de Dados
1. No MySQL Workbench, execute o script contido no arquivo coritibateam.sql disponível na raiz do projeto.
2. Este script criará o schema coritibateam e as tabelas com dados iniciais.

### 2. Backend
1. Navegue até a pasta /Backend: cd Backend
2. Instale as dependências: npm install
3. Certifique-se de que as credenciais no arquivo src/config/db.js condizem com seu MySQL local. (Verifique sua senha do banco de dados)
4. Inicie o servidor: npm run dev
   - Servidor rodando em: http://localhost:3000

### 3. Frontend
1. Navegue até a pasta /Frontend: cd Frontend
2. Instale as dependências: npm install
3. Inicie a aplicação: npm run dev
   - Aplicação rodando em: http://localhost:5173
