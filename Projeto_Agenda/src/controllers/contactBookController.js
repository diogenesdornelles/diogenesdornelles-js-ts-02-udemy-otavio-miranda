const { User } = require('../models/UserModel');
const { Contact } = require('../models/ContactModel');

exports.contactBookPage = (req, res) => {
  if (req.params.load === 'contactBookPage' && typeof req.params._idUser !== 'undefined') {
    User.findOne({ 
      _id: req.params._idUser
    })
    .then(data => {
      if (data) {
        Contact.find()
        .then( data => {
          res.render('contactBook', {
                          logged: true, 
                          contacts: data, 
                          }
    )}).catch( err => console.log(err));
      } else {
        res.render('contactBook', {
                logged: false, 
                contacts: false, 
              }
            )}
    }).catch( err => console.log(err));
} else {
  res.render('contactBook', {
          logged: false, 
          contacts: false, 
        }
      )}
}

exports.insertContact = (req, res ) => {
  console.log(req.body);
  function turnNullSession() {
    req.session.validateContact = {}
  }
  Contact.create({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    phone: req.body.phone,
    birthday: new Date(req.body.birthday),
    gender: req.body.gender,
    cpf: req.body.cpf,
  })
  .then((data) => {
    console.log(data);
    turnNullSession();
    req.session.validateContact.success = 'Contato salvo no cadastro!';
    req.session.save();
    // render contactBook att
    res.status(204).send();
  })
  .catch(err => {
    turnNullSession();
    if (err.name === 'ValidationError'){
      if ('cpf' in err.errors) {
        req.session.validateContact.cpf = 'CPF inválido!';
        req.session.save();
        res.status(204).send();
        return;
      } 
    } 
    if (err.code === 11000) {
      if ('cpf' in err.keyPattern){
        req.session.validateContact.cpf = 'CPF já consta no cadastro!';
        req.session.save();
        res.status(204).send();
        return;
      } 
    } 
  });
}