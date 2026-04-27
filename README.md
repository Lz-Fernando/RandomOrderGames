# Documentação do Sistema: Plataforma de Recomendação de Jogos

## 1. Visão Geral do Projeto (Overview)
* **Propósito:** A aplicação é uma plataforma de descoberta e recomendação de jogos. Ela resolve a dificuldade de encontrar novos títulos que se encaixem em critérios específicos e combate a indecisão dos usuários na escolha do que jogar. A interface central é composta por um painel de destaque exibindo os 9 jogos recentes mais populares e uma barra de ferramentas lateral para buscas avançadas. O usuário pode aplicar múltiplos filtros (texto, plataforma, gênero, nota de avaliação e ano de lançamento) para gerar catálogos paginados ou utilizar um sistema de roleta para receber uma indicação única.
* **Público-alvo:** Jogadores casuais ou hardcore que buscam encontrar rapidamente jogos que atendam às suas necessidades específicas (via lista), bem como perfis indecisos que preferem receber uma recomendação aleatória e assertiva baseada em seus gostos.
* **Principais Funcionalidades (Core Loop):**
  * **Vitrine de Tendências:** Tela inicial carregada automaticamente com um grid dos jogos em alta no momento.
  * **Busca e Filtragem Avançada:** Sistema combinatório de filtros (Plataforma, Gênero, Nota, Ano e Palavra-chave) com resultados organizados por paginação.
  * **Sorteio de Recomendação:** Mecânica que seleciona e exibe aleatoriamente um único jogo que obedeça estritamente aos critérios dos filtros aplicados pelo usuário.

## 2. Especificação de Requisitos

### Requisitos Funcionais
*(As ações e comportamentos que o sistema obrigatoriamente deve realizar)*
* **Integração de Dados:** O backend deve se conectar e consumir os dados do catálogo de jogos diretamente da API pública do RAWG.
* **Comunicação Back-to-Front:** O backend deve ser o único responsável por processar o retorno do RAWG e fornecer os dados limpos e paginados para consumo do frontend.
* **Motor de Filtragem Universal:** O sistema deve suportar e processar com sucesso qualquer combinação possível entre os filtros de texto, plataforma, gênero, nota de avaliação e ano de lançamento.
* **Sorteador Dinâmico:** A mecânica de sorteio de recomendação deve operar perfeitamente sobre a listagem filtrada, selecionando um único jogo de forma aleatória que respeite estritamente todos os parâmetros combinados pelo usuário.

### Requisitos Não Funcionais
*(Os critérios de qualidade, performance e arquitetura do sistema)*
* **Escalabilidade Arquitetural:** O sistema deve ser projetado com foco atual em uso individual/proprietário, mas possuir uma base de código modular e escalável que permita uma transição suave para acesso do público geral no futuro.
* **Segurança de Credenciais:** A chave de API (API Key) do RAWG deve ser armazenada e operada exclusivamente no backend, garantindo que não fique exposta no lado do cliente (frontend).
* **Performance de Busca:** A aplicação deve garantir um tempo de resposta ágil mesmo quando o usuário aplicar múltiplos filtros simultâneos ou solicitar a paginação dos dados.

## 3. Arquitetura e Stack Tecnológica

### Stack Tecnológica
* **Linguagem Principal:** JavaScript (ECMAScript), garantindo uniformidade e agilidade na manutenção em ambas as pontas do projeto (Frontend e Backend).
* **Frontend (Client-side):** React.js para a construção de uma interface dinâmica baseada em componentes (Single Page Application). A estilização visual será conduzida via Tailwind CSS, permitindo um design moderno, responsivo e ágil com base em classes utilitárias.
* **Backend (Server-side):** Node.js operando em conjunto com o framework Express.js. Esta camada servirá como central de processamento seguro, responsável por consumir a API do RAWG, omitir a API Key do lado do cliente e formatar os dados antes de enviá-los à interface.

### Padrões de Arquitetura e Comunicação
* **Modelo de Arquitetura:** Cliente-Servidor (Client-Server Architecture). O React gerencia exclusivamente a camada de apresentação e interatividade com o usuário, enquanto o Node.js foca no roteamento e nas regras de negócio da filtragem.
* **Padrão de Comunicação:** API RESTful. O backend exporá endpoints internos e estruturados para que o frontend consuma os catálogos paginados e os sorteios em formato JSON.

## 4. Modelagem de Dados
* **Fase 1 - Estado Atual (MVP):** A aplicação operará de forma stateless (sem estado) e puramente conectada à API externa. Nenhum dado de usuário, histórico de filtros ou lista de favoritos será armazenado em um banco de dados local. As informações exibidas no frontend serão sempre um reflexo em tempo real das requisições processadas pela camada do servidor.
* **Fase 2 - Roadmap Futuro (Sistema de Backlog):** A arquitetura está projetada com ganchos modulares para receber a integração futura de um banco de dados (ex: PostgreSQL ou MongoDB). Essa expansão contemplará tabelas/coleções robustas para gerenciamento de perfis de usuário, listas customizadas de jogos (jogando, finalizados, largados, desejos) e sistema próprio de avaliações.

## 5. Documentação de API e Integrações

### Integração Externa
* **Provedor de Dados Primário:** RAWG Video Games Database API.
* **Segurança e Autenticação:** A comunicação com o RAWG será feita através de uma API Key armazenada de forma segura em variáveis de ambiente (`.env`) exclusivamente no servidor Node.js, blindando a credencial contra acessos não autorizados pelo cliente.

### Endpoints Internos (Backend para Frontend)
Para seguir a arquitetura estabelecida, o backend em Node.js/Express fornecerá rotas no padrão RESTful para o consumo exclusivo da interface em React.js. Todas as respostas seguirão o formato JSON:
* `GET /api/games/trending`: Rota responsável por buscar, formatar e devolver o array contendo exatamente os 9 jogos mais populares recentes para abastecer a vitrine da tela inicial.
* `GET /api/games/search`: Endpoint que receberá parâmetros via query string (ex: `?platform=pc&genre=action&page=1`) e devolverá o catálogo de jogos filtrados, já processando adequadamente os dados de paginação.
* `GET /api/games/random`: Rota dedicada ao processamento da roleta de indicações. Ela recebe os critérios de filtro escolhidos pelo usuário, cruza os dados com o catálogo e devolve os dados de um único jogo sorteado de maneira aleatória.

## 6. Guia de Instalação e Deploy

Esta seção fornece as instruções para que outros desenvolvedores consigam trabalhar no projeto. O código-fonte está estruturado no formato de Monorepo, mantendo os ecossistemas do cliente e do servidor unificados no mesmo repositório para facilitar o versionamento.

### Ambiente Local
Passos para clonar o repositório, instalar dependências e rodar o projeto no próprio computador:
1. **Clonagem do Projeto:**
   * Execute `git clone [URL_DO_SEU_REPOSITORIO]`.
2. **Inicialização do Backend:**
   * Acesse o diretório do servidor: `cd back-end`.
   * Instale as dependências do Node: `npm install`.
   * Crie um arquivo `.env` na raiz do backend contendo a credencial da API (ex: `RAWG_API_KEY=sua_chave_aqui`).
   * Inicie o servidor de desenvolvimento: `npm run dev`.
3. **Inicialização do Frontend:**
   * Em uma nova aba do terminal, acesse o diretório do cliente: `cd front-end`.
   * Instale as dependências do React/Tailwind: `npm install`.
   * Inicie a aplicação: `npm start` (ou `npm run dev`, dependendo do bundler utilizado, como Vite).

### Deploy (Produção)
Como compilar (build) e publicar a aplicação em produção nos servidores web:
* **Frontend (Vercel):** O deploy da interface é realizado via integração contínua (CI/CD) com a Vercel. Nas configurações do projeto na plataforma, o Root Directory (diretório raiz) deve ser explicitamente apontado para a pasta `front-end`. O build gerará os arquivos estáticos necessários para a navegação do usuário.
* **Backend (Render / Railway):** A API em Express.js é hospedada em um serviço de nuvem (PaaS) preparado para manter instâncias ativas do Node.js. O Root Directory do serviço deve ser configurado para a pasta `back-end`, onde as variáveis de ambiente (como a API Key do RAWG) serão cadastradas de forma segura diretamente no painel da plataforma.
README.md
Exibindo README.md.
