/*importando o mongoose e referenciando nosso model 
Mentions para podermos utilizar seus métodos no controller.*/

const mongoose = require("mongoose");
const Mentions = mongoose.model("Mentions");

//utilizar essa função para retornar um erro, caso o usuário tenha cometido um engano
const { validationResult } = require("express-validator");

const repository = require("../repositories/mentions-repository");

/**T1
 * método de listagem de dados, que é uma função assíncrona que aguarda
 * (await) a chamada de Mentions.find(). Quando Mentions.find retornar
 * algum valor, ele será armazenado em data e devolvido pelo express
 * através de res.status(200).send(data). Caso aconteça algo errado,
 * retornamos o erro “Falha ao carregar as menções”.
 */
//T2: adicionar 'friend mention -_id' não exibe id no get
// list
/* exports.listMentions = async (req, res) => {
  try {
    const data = await Mentions.find({}, 'friend mention -_id');
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções.'});
  }
}; */

//T2
// list
exports.listMentions = async (req, res) => {
  try {
    const data = await repository.listMentions();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao carregar as menções!" });
  }
};

//E1: Meu Exibe, pega do repository
/* 
exports.exibeMentions = async (req, res) => {
  try {
    const data = await repository.exibeMentions();
    console.log("1.1: exibeMentions, passou controller")
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções!'});
  }
};
 */

//E1: Exibe
//Update, atualizar mentions
exports.exibeMentions = async (req, res) => {
  //Validação de erros
  const { erros } = validationResult(req);
  /* Erro
  if(erros.length > 0){
    return res.status(400).send({message: erros})
  }
 */
  try {
    //await repository.exibeMentions(req.params.id, req.body);
    //console.log("Q2")
    const data = await repository.exibeMentions(req.params.id);

    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao atualizar a menção." });
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
/* exports.createMention = async (req, res) => {
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
}; */

//console.log("P2");

//T2
// create
exports.createMention = async (req, res) => {
  /*
  Estamos recuperando o array errors de dentro da requisição, 
  que foi adicionado pelo check(), caso o usuário tenha cometido um engano.
  */
  const { errors } = validationResult(req);

  /*
Em seguida validamos se errors não está vazio. 
Se errors possuir algum valor, significa que precisamos tratar isso.
*/
  if (errors.length > 0) {
    return res.status(400).send({ message: errors });
  }

  try {
    await repository.createMention({
      friend: req.body.friend,
      mention: req.body.mention
    });
    return res.status(201).send({ message: "Menção cadastrada com sucesso!" });
  } catch (e) {
    return res.status(500).send({ message: "Falha ao cadastrar a menção." });
  }
};

//Update, atualizar mentions
exports.updateMention = async (req, res) => {
  //Validação de erros
  const { erros } = validationResult(req);
  /* Erro
  if(erros.length > 0){
    return res.status(400).send({message: erros})
  }
 */
  try {
    await repository.updateMention(req.params.id, req.body);
    res.status(200).send({
      message: "Menção atualizada com sucesso!"
    });
  } catch (e) {
    res.status(500).send({ message: "Falha ao atualizar a menção." });
  }
};

//Importando a função de delete do repository
exports.deleteMention = async (req, res) => {
  try {
    await repository.deleteMention(req.params.id);
    console.log(req.params.id)
    res.status(200).send({
      message: "Menção removida com sucesso!"
    });
  } catch (e) {
    res.status(500).send({ message: "Falha ao remover a menção." });
  }
};
