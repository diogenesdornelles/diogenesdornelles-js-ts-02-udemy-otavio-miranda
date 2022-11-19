const HomeModel = require('../models/HomeModel');

exports.homeSaveDataFormDB = (req, res) => {
  HomeModel.create({
    nome: req.body.nome,
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
  res.send('Formulário enviado.')
  next()
}
