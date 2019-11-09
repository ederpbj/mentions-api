const mongoose = require('mongoose');
const Mentions = mongoose.model('Mentions');

//funções de transformação no repository

//Listar
exports.listMentions = async () => {
  const res = await Mentions.find({}, 'friend mention -_id');
  //console.log("Passou no list Principal")
  return res;
};

//E1: Exibir mention
exports.exibeMentions = async (id) => {
  //const res = await Mentions.findById({id}, 'friend mention -_id');
  const res = await Mentions.findById(id, 'friend mention -_id')
  return res;
};

//console.log("P1");

//Criar mentions
exports.createMention = async data => {
  const mention = new Mentions(data);
  await mention.save();
};

//Atualizar mentions
exports.updateMention = async (id, data) => {
  await Mentions.findByIdAndUpdate(id, {
    $set: data
  });
};

//Criando a função de delete
//Delete, função propria para excluir
exports.deleteMention = async id => {
  console.log(id)
  await Mentions.findOneAndDelete({"_id":id});
  //await Mentions.findOneAndRemove(id); // Deprected
};

