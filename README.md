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

### [CONSTRUINDO UMA API COM NODE.JS - PARTE 2: MELHORANDO NOSSA CRIAÇÃO E LISTAGEM DE DADOS](https://woliveiras.com.br/posts/construindo-uma-api-com-node-js-parte-2-melhorando-nossa-cria%C3%A7%C3%A3o-e-listagem-de-dados/)

> Instalar validator

  npm install --save express-validator

### [CONSTRUINDO UMA API COM NODE.JS - PARTE 3: ATUALIZANDO E DELETANDO DADOS](https://woliveiras.com.br/posts/construindo-uma-api-com-node-js-parte-3-atualizando-e-deletando-dados/)

### [Conectar Atlas mongo ao Studio 3T](https://studio3t.com/knowledge-base/articles/connect-to-mongodb-atlas/)

conectar com 3T

From URI

  mongodb+srv://<username>:<password>@cluster0-wvrbx.mongodb.net/test?retryWrites=true&w=majority

Sequencia de execução: 

  repository -> controllers -> routes

  ### Criando a função de delete

  //Testando o delete no Postman

## PARTE 4: SUBINDO UMA API NODEJS NO GOOGLE CLOUD

[Parte 4](https://woliveiras.com.br/posts/construindo-uma-api-com-nodejs-parte-4-subindo-uma-api-nodejs-no-google-cloud/#GoogleCloudPlatformGCP)

* Google Cloud Platform (GCP)
- Poderíamos ter utilizado Amazon AWS, Microsoft Azure, Digital Ocean ou Heroku

* Criando um projeto no Google Cloud
* Ativando o App Engine
* Instalando o Google Cloud SDK
* Ativando o Google Cloud Build API
* Fazendo deploy no Google Cloud
* Conclusão

> Passos para projeto

Acesse o seguinte link para criar o projeto: 
[criação de projeto no GCP](https://console.cloud.google.com/projectcreate)


Ative o App Engine para Node.js utilizando este link: 
[ativar o App Engine usando Node.js](https://console.cloud.google.com/appengine/create?lang=nodejs&st=true)

Instale o Google Cloud SDK através do link: 
[GCP SDK](https://cloud.google.com/sdk/docs/)

Ativando o Google Cloud Build API
[GCP Build API](https://console.developers.google.com/apis/library/cloudbuild.googleapis.com)

Crie o arquivo app.yaml e adicione o seguinte conteúdo:
runtime: nodejs10

> Comandos no cmd
{
    Não usados

    Para fazer login, execute:

        gcloud auth login

    Agora execute o comando abaixo, mudando de PROJECT_ID para o ID que você copiou:

        gcloud config set project PROJECT_ID
}

> Comandos finais

    cd D:\01 Dev\01 Projetos\node\mentions-api
    gcloud app deploy
    gcloud app browse


gcloud info

> Configurando servidor windows no google cloud

    * iis provides server to the windows
    * click on add roles and features
        * select iis here (web iis server)
        * net framework
        * http redirection

> Configurar e instalar mongodb no windows server

instalar nodejs
mongodb community

* node -v 
* npm -v
* mongo
* mongod (no cmd testar path)

> Enviar aplicação para google cloud

https://www.youtube.com/watch?v=fAUT1-MuxKc

>Comando iniciais

	curl https://sdk.cloud.google.com | bash

	source ~/.bashrc


    P1:	which gcloud

	gcloud

> Cria no projeto

	app.yamn

> no arquivo app.yamn

	runtime: nodejs10

> Testar

	npm start

> Logar no gcloud

	P2: gcloud auth login

    gcloud config set project PROJECT_ID

    P3: gcloud config set project api-devstagran-1010

	P4: gcloud app deploy

	gcloud init

> Escolher nome do projeto

	gcloud app deploy

> Escolher localidade

> Ver no browser

	P5: gcloud app browse

> Correção de erros

	mudar porta para 8080