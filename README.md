# mentions-api
API COM NODE.JS

[git clone](https://github.com/ederpbj/mentions-api.git)

## Site tutorial

[construindo-uma-api-com-node-js-parte-1](https://woliveiras.com.br/posts/construindo-uma-api-com-node-js-parte-1-criando-e-listando-dados/)

> Iniciando projeto 

    npm init -y

> Nodemon e express

    npm install --save express debug && npm install --save-dev nodemon

> No arquivo package.json adicione o seguinte comando na chave “scripts”:

"scripts": {
    "dev": "node node_modules/nodemon/bin/nodemon bin/server"
}

> Testar com modo dev

    npm run dev

## Conectando ao MongoDB Atlas

Acesse o site [mongodb.com/cloud](https://cloud.mongodb.com/)

> Procure pelo botão New Project e pode dar o nome de: 

    mentions-api-project.

> Free Tier, versão gratuita dos serviços, que é limitada a 512 MB de armazenamento. Se quiser, pode deixar como está e clicar em Create a Cluster.

> instalar as dependências, execute o comando:
// A lib dotenv será responsável por ler o arquivo .env 

    npm install --save mongoose dotenv


A lib dotenv será responsável por ler o arquivo .env que vamos criar em breve (e que não deve ser enviado para o GitHub) e carregar as nossas variáveis de ambiente, que vamos criar já já.

Para conectar a um banco de dados precisamos de algumas informações, como:

endereço de IP ou domínio do servidor do banco de dados
a porta pela qual temos acesso a API do banco
usuário e senha para acesso ao banco
No nosso cluster temos todas essas informações, mas, antes de qualquer coisa, precisamos criar um usuário com poderes leitura e escrita no banco. Procure pelo item Database Access no menu do cluster (estará ao lado esquerdo da tela) e em seguida clique em add new user.

> Colar a chave no **.env** na raiz do projeto

    mongodb+srv://<user>:<senha>@cluster0-wvrbx.mongodb.net/test?retryWrites=true&w=majority

> Modelando nosso banco de dados

voltar na tela de clusters (clicando em Clusters, na esquerda) e vamos pegar a connection string, a linha de texto de configuração do nosso banco de dados. Clique em connect.

Com isso temos a nossa aplicação Express conectada com o MongoDB em um cluster na nuvem (cloud) nos servidores da Amazon AWS (ou no que você escolheu como provedor) via Atlas Cloud.

## Modelando nosso banco de dados

> Crie a pasta models dentro da pasta src e depois crie o arquivo mentions.js

### Criando os métodos de criar e listar dados do banco

Agora podemos partir para a criação dos métodos que irão criar e listar os dados do banco de dados. Para isso crie uma pasta controllers dentro de src e crie o arquivo mentions-controller.js

### Códigos de status HTTP

Trabalhando com a internet, por baixo dos panos, nós trocamos mensagens entre servidor e navegador, entre servidor e servidor e entre servidor e outros dispositivos. Dentro dessas mensagens existe algo chamado status code. Esse status code diz o que aconteceu em nosso servidor, como:

* 200: tudo OK
* 201: criado
* 400: sua requisição tem algum problema
* 404: o conteúdo que você pediu não foi encontrado
* 500: deu um problema no nosso servidor
* 503: serviço inoperante
Existem muitos status codes. Eles existem para facilitar a comunicação via rede e por isso precisam que ser bem amplos. Na documentação da Mozilla você tem mais status codes, MDN - HTTP/status, mas o que precisa para agora são esses que informei.

### Async/Await

Async/await é uma maneira de trabalhar com programação assíncrona em JavaScript. Algo assíncrono pode ser uma função, comunicação ou qualquer execução de código que vai demorar um tempo e precisamos esperar isso acontecer para enfim voltar a trabalhar/executar o resto do código. Para que o processamento não fique travado nesse pedaço de código, como no nosso caso que é uma chamada ao banco de dados e isso pode demorar, nós utilizamos o modo async para dizer: Express, espere o banco de dados retornar e depois você pode continuar aqui, enquanto isso pode ir fazer qualquer coisa que ainda tiver que fazer.

Poderia ser qualquer coisa, como escrever em disco (gravar um arquivo), esperar um cronômetro, aguardar uma chamada para outra API. Para tudo o que for necessário esperar um processamento, podemos utilizar async/await.

### Testar com postman

[postman](getpostman.com/downloads)

Clique no botão de mais (+) e ele irá abrir uma caixa onde você pode inserir um endereço e enviar (clicando em Send). Se a sua API ainda estiver de pé (se você não matou o nosso servidor que roda no npm run dev) adicione o endereço inicial (localhost:3000) e clique em send. Você receberá a resposta como aconteceu no navegador.

Do lado do endereço podemos especificar o verbo HTTP (GET, POST, DELETE, etc) que estamos enviando para o servidor e assim vamos ter as respostas que adicionamos em app.get e app.post no Express.

Faça um GET em mentions (localhost:3000/mentions) e veja o resultado:

Agora vamos fazer um POST e criar nossa primeira menção. Mude o verbo para POST, no campo do lado da URL. Deixe a URL como mentions mesmo, pois é a que adicionamos em nossa routes. Logo abaixo da URL temos algumas abas, clique em Body, depois selecione raw e em seguida selecione JSON (application/json). Cole o seguinte conteúdo dentro da caixa de texto do Postman:

{
	"friend": "Seu Madruga",
	"mention": "A vingança nunca é plena, mata a alma e a envenena"
}

### Conclusão

Até aqui temos uma API recebendo requisições e retornando informações. Criamos toda a estrutura de código necessária para trabalharmos em cima disso com Node.js, Express, MongoDB e mongoose. Incluímos variáveis de ambiente para garantir uma certa segurança em nossa aplicação, criamos uma conta e um cluster no Atlas, para guardar nossos dados e já estamos listando e criando dados nas coleções do MongoDB via Postman.

## CONSTRUINDO UMA API COM NODE.JS - PARTE 2: MELHORANDO NOSSA CRIAÇÃO E LISTAGEM DE DADOS

[Site Tutorial](https://woliveiras.com.br/posts/construindo-uma-api-com-node-js-parte-2-melhorando-nossa-cria%C3%A7%C3%A3o-e-listagem-de-dados/)

Aprendemos a criar uma API com Node.js, Express, MongoDB e o Atlas. Agora precisamos organizar melhor o nosso código e desenvolver algumas melhorias na utilização da API.

No último artigo aprendemos a criar a estrutura básica de uma API com Node.js e Express, buscando dados no Atlas, MongoDB, e utilizando Postman para validação se está tudo funcionando: [Construindo uma API com Node.js - Parte 1: criando e listando dados.](https://woliveiras.com.br/posts/construindo-uma-api-com-node-js-parte-1-criando-e-listando-dados/) Porém tudo sempre pode melhorar.

Quando acessamos a rota de listagem em nossa API, ela retorna dados que não estamos precisando. O retorno é este aqui:

[
    
        "_id": "5d19e89dcc98671f7fd8b4a3",
        "friend": "Seu Madruga",
        "mention": "A vingança nunca é plena, mata a alma e a envenena",
        "__v": 0
    
]
Também não estamos validando o tipo de entrada quando criamos uma menção, o que possibilitaria que alguém enviasse uma mensagem como essa:

{
	"friend": "!",
	"mention": "!"
}
Não queremos que isso seja possível.

Outro ponto importante: temos nosso acesso ao model inteiro via controller, se nossa regra de negócio aumentar, esses trechos de código irão ficar com uma responsabilidade muito grande, além de espalhar a chamada ao model em vários locais. Seria legal utilizarmos algum padrão de projeto para organizar essas chamadas e armazenar a nossa lógica de negócios em um único local que pode ser importado por outros controllers, como o repository pattern.

Vamos aos trabalhos!

Retornando somente os dados que desejamos exibir
Melhorando nossa organização de código com repository pattern
Validando entradas de dados
Conclusão
Referências
Imagem de copas de árvores

Retornando somente os dados que desejamos exibir
Para limpar o retorno da nossa API, na chamada do método listMentions, vamos melhorar a nossa utilização do método find() do nosso Model. Ao invés de executarmos Mentions.find() somente com um objeto vazio, vamos parametrizar essa chamada.

Nós temos somente dois campos que desejamos recuperar do banco de dados que são friend e mention. Então vamos alterar o arquivo mentions-controller.js e adicionar a seguinte string logo depois do objeto que vem dentro de find: “friend mention”.

O código ficará assim:

exports.listMentions = async (req, res) => {
  try {
    const data = await Mentions.find({}, ‘friend mention’);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções!'});
  
};
Agora, ao executar a nossa chamada GET a rota localhost:3000/mentions no Postman, o retorno será algo parecido com:

[
    
        "_id": "5d19e89dcc98671f7fd8b4a3",
        "friend": "Seu Madruga",
        "mention": "A vingança nunca é plena, mata a alma e a envenena"
    },
    
        "_id": "5d1b263cfa7e0c580519a632",
        "friend": "Chuck",
        "mention": "Prefiro me arriscar no mar alto do que ficar aqui e morrer nesta ilha de merda, falando o resto da minha vida com a droga de uma bola de vôlei!"
    
]
Mas o _id ainda está ali. Precisamos remover este valor também. Na nossa string de seleção, podemos dizer que não desejamos um valor utilizando o -. Então basta colocar -_id na chamada.

exports.listMentions = async (req, res) => {
  try {
    const data = await Mentions.find({}, ‘friend mention -_id’);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções!'});
  
};
Pronto! Agora nosso retorno está OK.

[
    
        "friend": "Seu Madruga",
        "mention": "A vingança nunca é plena, mata a alma e a envenena"
    },
    
        "friend": "Chuck",
        "mention": "Prefiro me arriscar no mar alto do que ficar aqui e morrer nesta ilha de merda, falando o resto da minha vida com a droga de uma bola de vôlei!"
    
]
Melhorando nossa organização de código com repository pattern
Vamos mover as chamadas a nosso Model em um local centralizador da regra de negócio, o repository. Dentro de src crie uma pasta chamada repositories e dentro dessa pasta crie o arquivo mentions-repository.js. Neste arquivo adicione o seguinte conteúdo:

const mongoose = require('mongoose');
const Mentions = mongoose.model('Mentions');

exports.listMentions = async () => {
  const res = await Mentions.find({}, 'friend mention -_id');
  return res;
};

exports.createMention = async data => {
  const mention = new Mentions(data);
  await mention.save();
};
Perceba que só movemos a camada de manipulação de dados do controller para o repository. Agora vamos ao nosso controller (src/controllers/mentions-controller.js) alterar como chamamos a camada de dados. Altere as linhas de código para o seguinte conteúdo:

const repository = require('../repositories/mentions-repository');

// list
exports.listMentions = async (req, res) => {
  try {
    const data = await repository.listMentions();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções!'});
  
};

// create
exports.createMention = async (req, res) => {
  try {
    await repository.createMention({
      friend: req.body.friend,
      mention: req.body.mention
    });
    res.status(201).send({message: 'Menção cadastrada com sucesso!'});
  } catch (e) {
    res.status(500).send({message: 'Falha ao cadastrar a menção.'});
  
};
Nós importamos o repository:

const repository = require('../repositories/mentions-repository');
As chamadas de dados agora são com repository.metodo():

const data = await repository.listMentions();
E:

    await repository.createMention({
      friend: req.body.friend,
      mention: req.body.mention
    });
Não mudou muita coisa, não é? Somente a maneira como vamos utilizar a camada de dados que agora fica mais organizada. Se algum dia precisarmos modificar algo na nossa regra de negócios, vamos direto ao nosso repository e não a todos os controllers que chamam nosso model.

Validando entradas de dados
Na nossa chamada para createMention, não estamos validando se os valores a serem inseridos no banco estão seguindo algum critério. Podemos limitar nossa criação como, por exemplo:

o nome de amigo(a) precisa ter ao menos 7 caracteres, um número estratégico escolhido pela nossa equipe de UX da mentions-api
a quantidade de caracteres de uma menção deve ser de no máximo 280 e no mínimo 20
Vamos implementar essas validações.

Para que não precisemos criar várias funções de validações diferentes, podemos utilizar uma lib chamada express-validator. Instale o express-validator com o comando:

npm install --save express-validator
Mas existe algo que precisa vir antes de começarmos a manipular as entradas: cuidar para que os dados que estão entrando em nossa API via POST sejam realmente um json ou um tipo de dado que esperamos via body do HTTP, utilizaremos a função express.json, junto com a express.urlencoded.

Adicione no seu app.js:

// App
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
Agora vamos importar o check do express-validator, no nosso mentions-router.js e adicionar suas validações na hora do POST check(nome do campo do boyd).validação.

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const mentionsController = require('../controllers/mentions-controller');

router.get('/', mentionsController.listMentions);
router.post('/', [
    check('friend').isLength({ min: 7 }).withMessage("O nome precisa ter no mínimo 7 caracteres."),
    check('mention').isLength({ min: 20, max: 280 }).withMessage("A menção precisa ter no mínimo 20 caracteres e no máximo 280.")
], mentionsController.createMention);

module.exports = router;
E no nosso mentions-controller.js vamos importar o validationResult e no createMention vamos utilizar essa função para retornar um erro, caso o usuário tenha cometido um engano.

const { validationResult } = require('express-validator');
const repository = require('../repositories/mentions-repository');

// create
exports.createMention = async (req, res) => {
  const {errors} = validationResult(req);

  if(errors.length > 0) {
    return res.status(400).send({message: errors})
  

  try {
    await repository.createMention({
      friend: req.body.friend,
      mention: req.body.mention
    });
    return res.status(201).send({message: 'Menção cadastrada com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao cadastrar a menção.'});
  
};
Estamos recuperando o array errors de dentro da requisição, que foi adicionado pelo check(), caso o usuário tenha cometido um engano.

const {errors} = validationResult(req);
Em seguida validamos se errors não está vazio. Se errors possuir algum valor, significa que precisamos tratar isso.

  if(errors.length > 0) {
    return res.status(400).send({message: errors})
  
Caso tudo estiver OK, o processo continua o mesmo.

Faça um teste. Tente inserir, via POST no Postman, algum valor menor que 7 caracteres no campo friend e menor que 20 ou maior que 280 no campo mentions. Depois liste seus dados, no GET e veja se algo foi inserido.

Conclusão
Fizemos nossa primeira refatoração de código (alterar o código para uma nova organização ou removemos coisas inúteis/repetidas), validamos dados para garantir integridade da nossa API e ainda limpamos o retorno da nossa listagem de dados para que o retorno fique mais fácil de manipular pelo client-side.

Nos próximos artigos vamos fazer:

Criar uma função de deletar menções
Criar uma função de atualizar menções
Subir nossa API em um serviço de hospedagem