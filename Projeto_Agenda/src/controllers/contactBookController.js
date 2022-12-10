const { User } = require('../models/UserModel');
const { Contact } = require('../models/ContactModel');

// RENDERIZE HTML
exports.get_contactBook_page = (req, res) => {
  if (req.params.load === 'contactBookPage' && (typeof req.params._idUser !== 'undefined')) {
    User.findOne({ 
      _id: req.params._idUser
    })
    .then(data => {
      if (data) {
        Contact.find().sort({ name: 1 })
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

// CREATE
exports.create_contact = (req, res ) => {
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
    req.session.validateContact.success = 'Contato salvo no cadastro!';
    req.session.save();
    // render contactBook att
    res.status(204).send();
  })
  .catch(err => {
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

// READ
exports.get_all_contacts = (req, res) => {
  Contact.find().sort({ name: 1 })
  .then( data => {
    if (data) {
      res.render('tableContacts', {
        contacts: data, 
        })
    } else {
      res.render('tableContacts', {
        contacts: false, 
        })
    }
    }).catch( err => console.log(err))
}

exports.get_contact_by_cpf = (req, res) => {
  Contact.findOne({ 
    cpf: req.params.cpfNumber,
  })
  .then(data => {
    if (data) {
      res.render('tableContacts', {
        contacts: [data], 
        })
    } else {
      res.render('tableContacts', {
        contacts: false, 
      }
    )}
    }).catch( err => console.log(err));
}

exports.get_contact_by_name = (req, res) => {
  Contact.findOne({ 
    name: req.params.name,
  })
  .then(data => {
    let result;
    if (data) {
      if (typeof data === 'object') {
        result = [data]
      } else {
        result = data;
      }
      res.render('tableContacts', {
        contacts: result, 
        })
    } else {
      res.render('tableContacts', {
        contacts: false, 
      }
    )}
    }).catch( err => console.log(err));
}

// UPDATE
exports.update_contact = (req, res) => {
  console.log(req.body, req.params)
  Contact.findOneAndUpdate(
    {
      _id: req.params._idContact
    },
    {
    name: req.body.data.name,
    surname: req.body.data.surname,
    email: req.body.data.email,
    phone: req.body.phone,
    birthday: new Date(req.body.data.birthday),
    gender: req.body.data.gender,
    cpf: req.body.data.cpf,
  })
  .then( data => console.log(data))
  .catch( err => console.log(err))
}

// DELETE
exports.delete_contact = (req, res) => {
  Contact.findByIdAndDelete(req.params._idContact)
  .then( () => {
    res.status(204).send();
    }).catch( err => console.log(err));
};