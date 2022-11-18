const HomeModel = require('../models/HomeModel');

exports.homeSaveDataFormDB = (req, res) => {
  HomeModel.create({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    idade: req.body.idade,
    nomeUsuario: req.body.usuario,
    senha: req.body.senha
  })
  .then((data) => {
    console.log(data);
  })
}

exports.showDataFromDB = (req, res) => {
  HomeModel.find()
  .then((data) => {
    console.log(data);
  })
  .catch(err => console.log(err));
}

// renderizar HTML
exports.homePage = (req, res) => {
  res.render('index');
}

// obter dados form via post
exports.homePageFormPost = (req, res, next) => {
  res.render('sendedForm')
  next()
}
