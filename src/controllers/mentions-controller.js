/*importando o mongoose e referenciando nosso model 
Mentions para podermos utilizar seus métodos no controller.*/ 
const mongoose = require('mongoose');
const Mentions = mongoose.model('Mentions');

/**
 * método de listagem de dados, que é uma função assíncrona que aguarda 
 * (await) a chamada de Mentions.find(). Quando Mentions.find retornar 
 * algum valor, ele será armazenado em data e devolvido pelo express 
 * através de res.status(200).send(data). Caso aconteça algo errado, 
 * retornamos o erro “Falha ao carregar as menções”.
 */
// list
exports.listMentions = async (req, res) => {
  try {
    const data = await Mentions.find({});
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções.'});
  }
};

/**
 * método de inserção de dados, que cria uma instância 
 * de Mentions (new Mention) e passa para o modelo os 
 * dados que recebemos via req.body. A nossa função também 
 * é assíncrona e aguarda a consolidação da inserção dos 
 * dados (await mention.save()). Então temos o envio de uma 
 * mensagem para o usuário informando que deu tudo certo ou uma mensagem de erro.
 */
// create
exports.createMention = async (req, res) => {
  try {
    const mention = new Mentions({
      friend: req.body.friend,
      mention: req.body.mention
    });

    console.log(mention)

    await mention.save();

    res.status(201).send({message: 'Menção cadastrada com sucesso!'});
  } catch (e) {
    res.status(500).send({message: 'Falha ao cadastrar a menção.'});
  }
};

