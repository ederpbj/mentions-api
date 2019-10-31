const mongoose = require('mongoose');
/*estamos chamando o módulo mongoose, em seguida instanciamos o Schema, 
um objeto do namespace mongoose. Assim como fazemos com Express */
const Schema = mongoose.Schema;

//modelamos nosso schema de fato e exportamos um model pelo mongoose
const schema = new Schema({
  friend: {
    type: String,
    required: true,
    trim: true
  },
  mention: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Mentions', schema);