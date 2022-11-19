const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
});

const HomeModel = mongoose.model('User', HomeSchema);

// class Home {

// }

// validar dados em class Home. Tudo é feito em Model. Limpar controller.
// module.exports = Home;
module.exports = HomeModel;