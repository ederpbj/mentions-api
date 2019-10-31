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
