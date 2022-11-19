const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: Number, required: true },
  mensagem: { type: String, required: true },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

// class Home {

// }

// validar dados em class Home. Tudo é feito em Model. Limpar controller.
// module.exports = Home;
module.exports = ContactModel;