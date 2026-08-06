# Especificação do MVP — Random Order Games

## 1. Visão Geral

O **Random Order Games** será uma aplicação web de página única voltada para descoberta e sorteio de jogos.

A aplicação permitirá que o usuário:

- Visualize jogos populares;
- Filtre jogos de acordo com suas preferências;
- Navegue pelos resultados utilizando paginação;
- Sorteie um jogo com base nos filtros selecionados.

Nesta primeira versão, a aplicação será exclusivamente de consulta e não utilizará banco de dados, autenticação ou armazenamento permanente de informações do usuário.

Todos os dados relacionados aos jogos serão obtidos por meio de uma API externa.

---

## 2. Objetivo do MVP

O objetivo do MVP é criar uma aplicação funcional e bem organizada que permita ao usuário encontrar ou sortear jogos utilizando informações provenientes de uma API externa.

Esta versão deverá servir como base para o aprendizado dos principais conceitos do Laravel, incluindo:

- Rotas;
- Controllers;
- Views com Blade;
- Integração com APIs externas;
- Serviços;
- Validação de dados;
- Paginação;
- Tratamento de erros;
- Organização de responsabilidades.

---

## 3. Estrutura da Página

A aplicação terá apenas uma página principal.

A tela será dividida em duas áreas:

1. Sidebar;
2. Conteúdo principal.

### Estrutura visual

```text
+----------------------+------------------------------------------+
|                      |                                          |
|       Sidebar        |           Conteúdo principal             |
|                      |                                          |
|  Nome do site        |   Listagem, resultados ou jogo sorteado  |
|  Filtros             |                                          |
|  Botão Filtrar       |                                          |
|  Botão Sortear       |                                          |
|                      |                                          |
+----------------------+------------------------------------------+
```

---

## 4. Sidebar

A sidebar será responsável por apresentar a identidade da aplicação e os controles disponíveis para o usuário.

Ela deverá conter:

- Nome do site;
- Campos de filtro;
- Botão de filtrar;
- Botão de sortear.

A sidebar deverá permanecer visível durante a utilização da aplicação.

---

## 5. Nome do Site

O nome **Random Order Games** deverá ser exibido na parte superior da sidebar.

O nome funcionará como principal elemento de identificação visual da aplicação.

Opcionalmente, ele também poderá funcionar como uma ação para retornar à listagem inicial de jogos populares.

---

## 6. Filtros

A sidebar deverá disponibilizar filtros para limitar os jogos apresentados ou considerados no sorteio.

Os filtros inicialmente previstos são:

- Nome do jogo;
- Gênero;
- Plataforma;
- Ano de lançamento;
- Avaliação mínima.

A disponibilidade exata de cada filtro dependerá dos recursos oferecidos pela API externa escolhida.

Os filtros poderão ser utilizados individualmente ou combinados.

### Exemplo

O usuário poderá procurar por:

> Jogos de RPG para PC, lançados após 2020 e com avaliação mínima de 80.

---

## 7. Persistência dos Filtros

Os valores selecionados nos filtros deverão permanecer preenchidos após qualquer ação realizada pelo usuário.

Isso inclui:

- Aplicação dos filtros;
- Navegação entre páginas;
- Sorteio de um jogo;
- Retorno da exibição do sorteio para uma listagem;
- Atualização da página, quando os filtros estiverem representados na URL.

Essa persistência não utilizará banco de dados.

Os filtros deverão ser mantidos por meio do estado da requisição e dos parâmetros de navegação da aplicação.

A finalidade desse comportamento é permitir que o usuário visualize claramente quais critérios estão ativos.

---

## 8. Botão Filtrar

Ao clicar no botão **Filtrar**, a aplicação deverá consultar a API externa utilizando os valores selecionados na sidebar.

O conteúdo principal deverá ser substituído por uma listagem dos jogos que correspondam aos filtros informados.

Os resultados deverão:

- Ser ordenados por popularidade;
- Ser exibidos em um grid;
- Possuir paginação;
- Preservar os filtros selecionados durante a navegação.

Caso nenhum filtro tenha sido preenchido, o comportamento esperado será equivalente à exibição da listagem geral de jogos populares.

---

## 9. Botão Sortear

Ao clicar no botão **Sortear**, a aplicação deverá selecionar aleatoriamente um jogo compatível com os filtros atualmente preenchidos.

O sorteio não deverá se limitar apenas aos nove jogos exibidos na página atual.

Ele deverá considerar o conjunto de jogos compatíveis retornado ou disponibilizado pela API externa.

Caso nenhum filtro esteja preenchido, o sorteio deverá considerar o catálogo geral de jogos disponível para consulta.

Após o sorteio, o conteúdo principal deverá ser substituído pela apresentação do jogo selecionado.

---

## 10. Conteúdo Inicial

Ao acessar a aplicação pela primeira vez, o conteúdo principal deverá apresentar uma listagem dos jogos mais populares.

Essa listagem deverá:

- Ser ordenada por popularidade;
- Apresentar nove jogos por página;
- Ser organizada em um grid de três colunas e três linhas;
- Possuir paginação.

### Organização do grid

```text
+------------+------------+------------+
|   Jogo 1   |   Jogo 2   |   Jogo 3   |
+------------+------------+------------+
|   Jogo 4   |   Jogo 5   |   Jogo 6   |
+------------+------------+------------+
|   Jogo 7   |   Jogo 8   |   Jogo 9   |
+------------+------------+------------+
```

Em telas menores, o número de colunas deverá ser reduzido para manter a responsividade da aplicação.

---

## 11. Cards dos Jogos

Cada jogo exibido nas listagens deverá possuir um card.

O card deverá apresentar:

- Capa do jogo;
- Título;
- Nota ou avaliação.

A capa deverá ser o principal elemento visual do card.

O título e a nota deverão ser facilmente legíveis.

Caso a API não disponibilize uma capa para determinado jogo, a aplicação deverá apresentar uma imagem padrão.

Caso a avaliação não esteja disponível, a interface deverá informar que o jogo ainda não possui nota.

---

## 12. Paginação

As listagens inicial e filtrada deverão possuir paginação.

Cada página deverá conter no máximo nove jogos.

A paginação deverá permitir:

- Avançar para a próxima página;
- Retornar à página anterior;
- Identificar a página atual;
- Navegar entre páginas, quando aplicável.

Ao navegar pela paginação, a aplicação deverá preservar:

- Os filtros selecionados;
- A ordenação por popularidade;
- O contexto atual da listagem.

Ao aplicar um novo filtro, a listagem deverá retornar para a primeira página.

---

## 13. Exibição do Jogo Sorteado

Após a realização do sorteio, o conteúdo principal deverá apresentar apenas o jogo selecionado.

Na parte superior do conteúdo deverá aparecer a mensagem:

> O jogo sorteado foi:

O jogo deverá ser exibido em destaque e ocupar uma área maior que os cards utilizados nas listagens.

A exibição deverá conter:

- Título;
- Capa;
- Nota ou avaliação.

### Estrutura visual aproximada

```text
             O jogo sorteado foi:

        +--------------------------+
        |                          |
        |       Capa do jogo       |
        |                          |
        +--------------------------+

              Título do jogo

                  Nota
```

Os filtros utilizados no sorteio deverão continuar visíveis na sidebar.

---

## 14. Ordenação

As listagens deverão ser ordenadas por popularidade.

Essa regra será aplicada tanto na listagem inicial quanto nos resultados filtrados.

A definição técnica de popularidade dependerá dos dados e critérios fornecidos pela API externa escolhida.

Pode ser necessário utilizar informações como:

- Total de avaliações;
- Total de usuários interessados;
- Popularidade calculada pela própria API;
- Quantidade de acessos;
- Relevância;
- Classificação fornecida pelo serviço externo.

A aplicação deverá utilizar um critério consistente em todas as listagens.

---

## 15. Estado de Carregamento

Enquanto a aplicação estiver aguardando uma resposta da API externa, deverá apresentar um estado de carregamento.

O usuário deverá receber um retorno visual indicando que a ação está sendo processada.

O carregamento poderá ocorrer durante:

- Abertura inicial da página;
- Aplicação de filtros;
- Navegação entre páginas;
- Sorteio de um jogo.

A interface não deverá parecer travada durante esse processo.

---

## 16. Ausência de Resultados

Caso nenhum jogo corresponda aos filtros selecionados, a aplicação deverá exibir uma mensagem clara.

Mensagem sugerida:

> Nenhum jogo foi encontrado com os filtros selecionados.

Os filtros deverão continuar preenchidos para que o usuário possa identificar e alterar os critérios utilizados.

A aplicação não deverá realizar um sorteio quando não existirem jogos compatíveis.

---

## 17. Tratamento de Erros

Caso a API externa esteja indisponível ou retorne um erro, a aplicação deverá informar o problema ao usuário.

Mensagem sugerida:

> Não foi possível carregar os jogos no momento. Tente novamente mais tarde.

Erros técnicos, credenciais ou informações sensíveis não deverão ser exibidos na interface.

A aplicação deverá diferenciar, internamente, situações como:

- Falha de autenticação com a API;
- Limite de requisições atingido;
- Indisponibilidade do serviço;
- Resposta inválida;
- Tempo limite excedido;
- Falha de conexão.

---

## 18. Responsividade

A aplicação deverá funcionar em computadores, tablets e dispositivos móveis.

Em telas grandes, a listagem deverá utilizar três colunas.

Em telas intermediárias, o grid poderá ser reduzido para duas colunas.

Em telas pequenas, os jogos poderão ser apresentados em uma única coluna.

A sidebar também deverá se adaptar a telas menores.

Ela poderá ser:

- Reposicionada acima do conteúdo;
- Transformada em painel recolhível;
- Aberta por meio de um botão.

A decisão final dependerá do design escolhido.

---

## 19. Fonte dos Dados

A aplicação utilizará uma API externa especializada em jogos.

A API definitiva ainda deverá ser escolhida.

As opções poderão incluir:

- IGDB;
- Outra API que possua catálogo confiável, filtros, paginação e dados de popularidade.

A API escolhida deverá fornecer, no mínimo:

- Identificador do jogo;
- Título;
- Capa;
- Avaliação;
- Plataforma;
- Gênero;
- Data de lançamento;
- Algum indicador de popularidade;
- Suporte a paginação ou limitação de resultados.

---

## 20. Persistência de Dados

O MVP não utilizará banco de dados.

Nenhuma informação será armazenada permanentemente.

A aplicação funcionará apenas como intermediária entre o usuário e a API externa.

O Laravel será responsável por:

- Receber os filtros;
- Validar os parâmetros;
- Consultar a API externa;
- Organizar os dados recebidos;
- Aplicar as regras necessárias;
- Renderizar os resultados.

---

## 21. Funcionalidades Fora do MVP

As seguintes funcionalidades não fazem parte da primeira versão:

- Cadastro de usuários;
- Autenticação;
- Perfil;
- Favoritos;
- Histórico de sorteios;
- Lista de jogos desejados;
- Avaliações feitas pelos usuários;
- Comentários;
- Persistência em banco de dados;
- Painel administrativo;
- Sistema personalizado de recomendações.

Essas funcionalidades poderão ser adicionadas em versões futuras.

---

## 22. Critérios de Aceitação

O MVP será considerado funcional quando:

1. A página inicial exibir jogos populares;
2. Os jogos forem exibidos em um grid de até nove itens;
3. Cada card apresentar título, capa e nota;
4. A listagem possuir paginação;
5. O usuário conseguir aplicar filtros;
6. Os resultados filtrados respeitarem os critérios selecionados;
7. Os resultados forem ordenados por popularidade;
8. Os filtros permanecerem preenchidos;
9. A paginação preservar os filtros;
10. O usuário conseguir sortear um jogo;
11. O sorteio respeitar os filtros selecionados;
12. O jogo sorteado for exibido em destaque;
13. A aplicação tratar ausência de resultados;
14. A aplicação tratar falhas da API;
15. A interface se adaptar a diferentes tamanhos de tela.

---

## 23. Fluxo Principal da Aplicação

```text
Usuário acessa a aplicação
          |
          v
Sistema busca jogos populares
          |
          v
Exibe nove jogos e paginação
          |
          +-----------------------------+
          |                             |
          v                             v
Usuário aplica filtros          Usuário solicita sorteio
          |                             |
          v                             v
Sistema consulta API            Sistema consulta jogos
com os filtros                  compatíveis
          |                             |
          v                             v
Exibe resultados                Seleciona um jogo
ordenados por                   aleatoriamente
popularidade                            |
          |                             v
          v                     Exibe jogo em destaque
Usuário navega
pela paginação
```

---

## 24. Resultado Esperado

Ao final do MVP, o Random Order Games deverá ser uma aplicação de página única, simples e funcional, capaz de apresentar, filtrar e sortear jogos utilizando dados obtidos em tempo real de uma API externa.

A aplicação deverá possuir uma arquitetura preparada para futuras evoluções, sem adicionar funcionalidades que não sejam necessárias nesta primeira etapa.
