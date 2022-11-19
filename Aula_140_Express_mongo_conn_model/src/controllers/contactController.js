const ContactModel = require('../models/ContactModel');

exports.contactPage = (req, res) => {
  res.render('contactPage');
}

exports.contactSaveDataFormDB = (req, res) => {
  ContactModel.create({
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
    mensagem: req.body.mensagem
  })
  .then((data) => {
    console.log(data);
  })
}

exports.showDataFromDB = (req, res) => {
  ContactModel.find()
  .then((data) => {
    console.log(data);
  })
  .catch(err => console.log(err));
}

exports.contactPageFormPost = (req, res, next) => {
  res.render('sendedForm')
  next()
}