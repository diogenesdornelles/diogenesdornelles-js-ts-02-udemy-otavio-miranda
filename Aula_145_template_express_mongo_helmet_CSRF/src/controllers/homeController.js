const User = require('../models/UserModel');

// Save data DB
exports.homeSaveDataFormDB = (req, res) => {
  User.create({
    nome: req.body.nome,
  })
  .then((data) => {
    console.log(data);
  })
}

// renderize HTML
exports.homePage = (req, res) => {
  res.render('index');
}

// render succsess form
exports.homePageFormPost = (req, res, next) => {
  res.send('Formulário enviado.')
  next();
}
