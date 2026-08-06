# Random Order Games

## Plataforma de Descoberta e Recomendação de Jogos

## Visão Geral

O **Random Order Games** é uma plataforma de descoberta e recomendação de jogos desenvolvida para auxiliar usuários a encontrarem novos títulos de acordo com seus interesses.

A aplicação permite explorar jogos, realizar buscas utilizando diferentes critérios e receber recomendações personalizadas através de um sistema de seleção aleatória inteligente.

O objetivo principal do projeto é solucionar um problema comum entre jogadores: a dificuldade de escolher um novo jogo para jogar diante de uma grande quantidade de opções disponíveis.

---

# Objetivo do Projeto

Criar uma plataforma capaz de:

- Apresentar jogos relevantes aos usuários;
- Facilitar a descoberta de novos títulos;
- Permitir filtros personalizados;
- Recomendar jogos baseados nas preferências selecionadas;
- Criar uma experiência moderna e intuitiva para exploração de jogos.

---

# Tecnologias Utilizadas

## Backend

### Laravel

Framework PHP utilizado para desenvolvimento da aplicação backend.

Responsável por:

- Gerenciamento das regras de negócio;
- Criação da estrutura da aplicação;
- Gerenciamento das requisições;
- Integração com APIs externas;
- Controle de autenticação e autorização;
- Comunicação com o banco de dados.

### PHP

Linguagem principal utilizada no desenvolvimento da aplicação.

---

# Frontend

## Blade Templates

Sistema de templates nativo do Laravel utilizado para construção das interfaces da aplicação.

Responsável pela renderização das páginas e organização dos componentes visuais.

## Livewire

Biblioteca utilizada para criação de componentes interativos utilizando o ecossistema Laravel, reduzindo a necessidade de criação de uma aplicação frontend separada.

Responsável por:

- Atualizações dinâmicas da interface;
- Componentes reativos;
- Interações do usuário sem recarregamentos completos da página.

## Tailwind CSS

Framework CSS utilizado para construção da interface responsiva e moderna.

Responsável por:

- Padronização visual;
- Criação de layouts;
- Componentes reutilizáveis;
- Responsividade.

---

# Banco de Dados

## MySQL

Nesta primeira versão da aplicação não haverá persistência de dados. Todas as informações serão obtidas em tempo real através de uma API externa.

---

# Integração Externa

## IGDB API

A aplicação utiliza a IGDB como principal fonte de dados sobre jogos.

As informações são obtidas em tempo real através da API oficial da IGDB.

Entre os dados consumidos estão:

- Nome
- Capa
- Gêneros
- Plataformas
- Data de lançamento
- Avaliações
- Descrição
- Franquias
- Jogos relacionados

A comunicação com a API é realizada exclusivamente pelo backend Laravel, mantendo as credenciais protegidas.

---

# Arquitetura do Sistema

A aplicação segue uma arquitetura baseada no padrão MVC do Laravel.

```
                    Usuário
                       |
                       |
                Interface Web
             Blade + Livewire
                       |
                       |
                  Laravel
                       |
        --------------------------------
        |              |               |
   Controllers     Services        Models
                       |
                       |
                 MySQL Database
                       |
                       |
                    RAWG API
```

---

# Organização da Aplicação

A estrutura do projeto seguirá boas práticas do ecossistema Laravel:

## Controllers

Responsáveis por:

- Receber requisições;
- Coordenar fluxos;
- Retornar respostas.

---

## Models

Responsáveis pela representação das entidades da aplicação e comunicação com o banco de dados.

---

## Services

Responsáveis por concentrar regras de negócio e evitar controllers com excesso de responsabilidades.

Exemplos:

- Busca de jogos;
- Aplicação de filtros;
- Sistema de recomendação;
- Integração com APIs externas.

---

## Form Requests

Responsáveis pelas validações das entradas recebidas pelo sistema.

---

## Policies

Responsáveis pelo controle de autorização e permissões.

---

# Funcionalidades

# Escopo da Versão 1

A primeira versão da aplicação tem como foco a descoberta de jogos utilizando uma API externa.

Estão previstas as seguintes funcionalidades:

- Página inicial com jogos em destaque;
- Busca por nome;
- Filtros por gênero;
- Filtros por plataforma;
- Filtros por avaliação;
- Filtros por ano de lançamento;
- Visualização detalhada de um jogo;
- Sistema de recomendação aleatória baseado nos filtros aplicados.

Nesta versão não serão implementados:

- Cadastro de usuários;
- Autenticação;
- Favoritos;
- Histórico;
- Persistência em banco de dados.

---

# Requisitos Técnicos

A aplicação deverá seguir boas práticas de desenvolvimento Laravel:

- Separação de responsabilidades;
- Código organizado e legível;
- Baixo acoplamento entre componentes;
- Validação adequada dos dados;
- Tratamento de erros;
- Uso adequado dos recursos do framework.

---

# Segurança

A aplicação deverá:

- Proteger informações sensíveis;
- Manter chaves de APIs externas protegidas;
- Validar dados enviados pelos usuários;
- Controlar permissões de acesso;
- Evitar exposição de informações internas.

---

# Objetivo da Versão Laravel

Esta versão representa uma reconstrução completa do projeto original, aplicando conhecimentos profissionais adquiridos durante o desenvolvimento com Laravel.

O objetivo é evoluir a aplicação utilizando:

- Arquitetura mais organizada;
- Boas práticas do framework;
- Separação adequada de responsabilidades;
- Código preparado para manutenção e evolução.
