const { Contact } = require('../models/ContactModel');

exports.apiSendAdviceRegister = (req, res) => {
  res.status(200).json(req.session.validateUser); 
} 

exports.apiSendAdviceLogin = (req, res) => {
  res.status(200).json(req.session.validateLogin); 
} 

exports.apiSearchByCPFNumber = (req, res) => {
  console.log(req.params)
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

exports.apiSearchByName = (req, res) => {
  console.log(req.params)
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

exports.apiSendAdviceContact = (req, res) => {
  res.status(200).json(req.session.validateContact); 
} 

exports.apiLoadContacts = (req, res) => {
  Contact.find()
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