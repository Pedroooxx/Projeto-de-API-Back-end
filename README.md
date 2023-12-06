# Projeto Web Back-end

Este projeto consiste em um sistema de cadastro de Jogos e conquistas em uma biblioteca pessoal.

# Passo a passo para o funcionamento da API

1. Para utilizar, acesse a pasta raiz do projeto e utilize o comando "npm install"
2. No arquivo "server.js" em "connect()" coloque o link para seu MongoDB server pessoal
3. utilize o comando "npm start"
4. acesse: "http://localhost:3333" -> este link será referenciado abaixo como "{URL}"
5. Utilize ferramentas como Insomnia e PostMan para usar os métodos HTTP (GET, POST, PUT e DELETE)
6. GET "{URL}/install" -> para instalar o banco de dados

# Regra de Negócio

Como forma de incentivar os usuários que utilizam a plataforma, sempre que uma CONQUISTA for adicionada
a um JOGO, um contador aumentará em 1, caso um JOGO tenha 3 conquistas cadastradas, o USUÁRIO que as
cadastrou terá 'completado o jogo' ou seja, a váriavel Completed Games aumentará em 1, isso fará que
sua posição no ranking público de usuários aumentará.

# Rotas Públicas - Há algumas coisas que podem ser feitas sem o cadastro/login prévio:
1. "{URL}" -> acessa a rota base do projeto contendo um ranking público de usuários baseado nos jogos completados
2. GET "{URL}/install" -> para instalar o banco de dados
3. GET "{URL}/docs" -> para gerar a documentação com Swagger
4. "{URL}/docs/ui" -> para acessar a documentação do Swagger com interface
5. POST "{URL}/registro" -> Se cadastra a plataforma
6. POST "{URL}/entrar" -> Entra na plataforma (Recebe o TOKEN de acesso as rotas privadas)

# Rotas Privadas - Necessário o cadastro/login prévio para o uso do Bearer Token

## Rotas de Usuário
### CRUD
1. GET "{URL}/usuario" -> Acessa as informações do usuário
2. PUT "{URL}/editar" -> Edita as informações do usuário via "params"
3. DELETE "{URL}/apagar" -> Apaga a conta do usuário logado
4. GET "{URL}/usuario/biblioteca?page=1" -> Acessa a Biblioteca do usuário (5 em 5 itens)
5. GET "{URL}/usuario/biblioteca/jogo/:id?page=1" -> Acessa um jogo do usuário e as suas conquistas pela "id" via "params" (5 em 5 itens)

## Rotas de Jogos
### CRUD
1. GET "{URL}/usuario" -> Acessa as informações do usuário
2. PUT "{URL}/editar" -> Edita as informações do usuário via "params"
3. DELETE "{URL}/apagar" -> Apaga a conta do usuário logado
4. GET "{URL}/usuario/biblioteca?page=1" -> Acessa a Biblioteca do usuário (5 em 5 itens)
5. GET "{URL}/usuario/biblioteca/jogo/:id?page=1" -> Acessa um jogo do usuário e as suas conquistas pela "id" via "params" (5 em 5 itens)

## Rotas de Conquistas
### CRUD
1. GET "{URL}/usuario" -> Acessa as informações do usuário
2. PUT "{URL}/editar" -> Edita as informações do usuário via "params"
3. DELETE "{URL}/apagar" -> Apaga a conta do usuário logado
4. GET "{URL}/usuario/biblioteca?page=1" -> Acessa a Biblioteca do usuário (5 em 5 itens)
5. GET "{URL}/usuario/biblioteca/jogo/:id?page=1" -> Acessa um jogo do usuário e as suas conquistas pela "id" via "params" (5 em 5 itens)


# Tecnologias
Deverão ser empregados as seguintes tecnologias na construção do projeto:
● Framework: será utilizado o framework Express, juntamente com os pacotes
apresentados em sala de aula. A utilização de alguma ferramenta adicional
deverá ser consultada, sob penalidade de invalidação do trabalho.
● Banco de dados: será de livre escolha de cada aluno, podendo ser um banco de
dados relacional (ex. MySQL ou PostgreSQL) utilizando o Sequelize ou o banco
de dados NoSQL MongoDB utilizando o Mongoose.
● Todas as funcionalidades deverão ser implementadas em formato de API REST
não sendo necessário o desenvolvimento de uma interface. Portanto, os testes
deverão ser realizados utilizando uma ferramenta específica para esta finalidade
como Nodemon, Insomnia, Talend, etc.
Usuários e sistema de autenticação (30%)
Os seguintes requisitos deverão ser implementados em relação ao gerenciamento e
controle de usuários:
1. O sistema deverá possuir uma rota que permite o cadastro de usuários. A rota
deve receber os dados pessoais e as credenciais (usuário e senha) para
autenticação na API.
2. O sistema deverá possuir um (ou mais) usuários administradores que possuem
privilégios específicos como alterar e excluir outros usuários e criar outros
administradores. A instalação do sistema deverá criar um usuário administrador
por padrão na aplicação.
3. Deverá haver uma rota para que os administradores possam criar outros
administradores.
4. Deverá haver uma rota para que os administradores possam excluir um usuário
não administrador.
5. /A rota de login deverá receber o usuário e senha gerar um token JWT que
permitirá acesso às rotas protegidas da API
6. Um usuário poderá alterar seus dados pessoais por meio de uma rota
específica. Os usuários comuns não poderão alterar dados de outros usuários,
todavia os administradores poderão.

# Sistema CRUD (valor: 30%)

Como requisito principal, o sistema deve permitir a realização de 3 (individual) ou 4
(dupla) cadastros (operações de CRUD completa), tal que, estes itens apresentem
entre si relacionamentos de um-para-muitos ou muitos-para-muitos, de acordo com a
livre escolha de cada aluno. Obrigatoriamente as operações de inserção, alteração e
exclusão devem ser restritas para o usuário autenticado no sistema (que possuem um
token válido). A restrição do acesso para as operações de listar e buscar pelo
identificador único são de livre escolha do desenvolvedor, conforme o tema proposto.
É necessário realizar a validação adequada dos dados fornecidos pelo usuário, e gerar
mensagens de erros personalizadas conforme o erro obtido. As mensagens de erros e
sucessos deverão ser enviadas juntamente com as respostas. Os métodos HTTP GET,
POST, PUT e DELETE devem ser empregados segundo a operação a ser executada.
Os métodos de listar deverão implementar a paginação dos dados, de tal forma que
eles devem receber 2 parâmetros: limite e página. O atributo limite define quantos
objetos devem ser retornados (os valores possíveis deverão ser 5, 10 e 30) na
consulta. O atributo página define o ponto em que começa o retorno. Por exemplo,
limite=5 e página=1, retorna os 5 primeiros registros; limite=5 e página=3, ignora os 10
primeiros registros e retorna do 11
o ao 15o
registro.

# Lógica de negócio, instalador e documentação (valor: 40%)

Deverá ser implementado alguma operação especial de livre escolha do aluno ou dupla
(disponível por uma ou mais rotas) implementando uma lógica de negócio que pode
envolver inserção/alteração no banco de dados, geração de consultas elaboradas e/ou
algum processamento dos dados sejam eles recebidos por parâmetros ou do próprio
banco de dados.
Além disso, deverá ser criado uma rota GET /install/ que realiza a instalação do banco
de dados (criação das tabelas/coleções e inserção de dados no banco). Cada
tabela/coleção deverá ser populada com pelo menos 5 registros.
Deverá ser criado uma rota GET /docs contendo a documentação gerada pela
ferramenta Swagger.
Prazos de entrega
A entrega se dará a partir da semana do dia 20 de novembro a partir de agendamento prévio
via Moodle em um sistema de fila (O primeiro a agendar será o primeiro a apresentar). O
agendamento sem apresentação levará a um desconto da nota. Se porventura, o número de
alunos solicitantes for maior do que a capacidade do professor de avaliar, os alunos não
atendidos deverão apresentar na próxima aula.
Considerações finais
● O desenvolvimento da API é individual ou duplas.
● Trabalhos similares ou plágio da internet serão zerados (se constatado alta
similaridade com outros códigos), portanto, evite copiar códigos ou seguir a risca
tutoriais/vídeo-aulas/chat-gpt.
● O trabalho deverá ser apresentado ao professor e eventualmente submetido a
alguma mudança em tempo real.
● O código deverá estar disponível em um repositório GIT, os commits devem ser
incrementais. Será considerado um percentual da nota para este requisito.
● Deverá ser utilizado um arquivo (.env) com as configurações do banco de dados
(pesquise sobre dotenv para mais detalhes).
● A organização da arquitetura do projeto e definição das rotas é de escolha
individual e também será um critério avaliado, portanto, mantenha o código
organizado.
● Se alguma parte do código não souber ser explicado pelo aluno/aluna, haverá
um desconto de nota proporcional a quantidade de código, de acordo com
critérios subjetivos definidos pelo professor durante a avaliação.
● Não utilizar pacotes e ferramentas não utilizados durante a aula sem o
conhecimento e ciência prévia do professor.
● As demais dúvidas e questões que porventura surjam serão resolvidos em
comum acordo entre alunos e professores, sendo a palavra final do professor :)