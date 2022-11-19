const HomeModel = require('../models/HomeModel');

exports.saveSession = (req, res) => {
  console.log(req.session)
  req.session.user = {
    nome: req.body.nome,
    logged: true,
  }
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
