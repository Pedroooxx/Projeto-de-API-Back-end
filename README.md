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
1. GET "{URL}/usuario" -> Acessa as informações do usuário
2. PUT "{URL}/editar" -> Edita as informações do usuário via "params"
3. DELETE "{URL}/apagar" -> Apaga a conta do usuário logado
4. GET "{URL}/usuario/biblioteca?page=1" -> Acessa a Biblioteca do usuário (5 em 5 itens)
5. GET "{URL}/usuario/biblioteca/jogo/:id?page=1" -> Acessa um jogo do usuário e as suas conquistas pela "id" via "params" (5 em 5 itens)

## Rotas de Jogos

Para as operações HTTP dos jogos, a id do usuário autenticado será conferida via token, fazendo com que somente o dono dos jogos possam altera-los

1. POST "{URL}/game" -> Posta um jogo via "body"
2. PUT "{URL}/game" -> Edita as informações de um jogo por id via "params" e informações por "body"
3. DELETE "{URL}/game" -> Apaga um jogo por id via "params"
4. GET "{URL}/game" -> Acessa um jogo por id via "params"

## Rotas de Conquistas

Para as operações HTTP das conquistas, a id do usuário autenticado será conferida via token, fazendo com que somente o dono dos jogos possam seja adicionar conquistas aos seus próprios jogos, bem como altera-las

1. POST "{URL}/game/achievment" -> Posta uma conquista para um jogo por sua id via "params" e as informações da conquista via "body"
2. PUT "{URL}/game/achievment" -> Edita a conquista de um jogo por sua id via "params" e as informações da conquista via "body"
3. DELETE "{URL}/game/achievment" -> Apaga uma conquista por id via "params"
4. GET "{URL}/game/achievment" -> Acessa um conquista por id via "params"
