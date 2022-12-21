const { User } = require('../models/UserModel');
const { Contact } = require('../models/ContactModel');
const { Schedule } = require('../models/ScheduleModel');
const { urlParser } = require('css-loader/dist/plugins');

exports.loginIsRequired = (req, res, next) => {
  if (req.params.load === 'contactBookPage' && (typeof req.params._idUser !== undefined)) {
    User.findOne({ 
      _id: req.params._idUser
    })
    .then(data => {
      if (data) {
        next();
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
};

// RENDERIZE FULL PAGE
exports.get_contactBook_page = (req, res) => {
        Contact.find().sort({ name: 1 })
        .then( data => {
          res.render('contactBook', {
                          logged: true, 
                          contacts: data, 
                        }
    )}).catch( err => {
      console.log(err);
      res.render('404');
    });
} 

// CREATE
exports.create_contact = (req, res ) => {

  Contact.create({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    phone: req.body.phone,
    date: new Date(`${req.body.date}`),
    gender: req.body.gender,
    cpf: req.body.cpf,
  })
  .then((data) => {
    // console.log(data);
    req.session[req.body.cpf] = {contact: 'Contato salvo no cadastro!'};
    req.session.save();
    res.status(204).send();
    return;
  })
  .catch(err => {
    console.log(err);
    if (err.name === 'ValidationError'){
      if ('cpf' in err.errors) {
        req.session[req.body.cpf] = {cpf: 'CPF inválido!'};
        req.session.save();
        res.status(204).send();
        return;
      } 
    } 
    if (err.code === 11000) {
      if ('cpf' in err.keyPattern){
        req.session[req.body.cpf] = {cpf: 'CPF já consta no cadastro!'};
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
    }).catch( err => {
      console.log(err);
      res.render('404');
    });
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
    }).catch( err => {
      console.log(err);
      res.render('404');
    });
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
    }).catch( err => {
      console.log(err);
      res.render('404');
    });
}

// UPDATE
exports.update_contact = (req, res) => {
  Contact.findOneAndUpdate(
    {
      _id: req.params._idContact
    },
    { $set: {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      phone: req.body.phone,
      birthday: new Date(req.body.birthday),
      gender: req.body.gender,
      cpf: req.body.cpf,
      }
    },
    { 
      runValidators: true, 
      new: true,
    },
  )
  .then( data => {
    // console.log(data);
    req.session[req.body.cpf] = {contact: 'Contato atualizado no cadastro!'};
    req.session.save();
    res.status(204).send();
    return;
  })
  .catch(err => {
    if (err.name === 'ValidationError'){
      if ('cpf' in err.errors) {
        req.session[req.body.cpf] = {cpf: 'CPF inválido!'};
        req.session.save();
        res.status(204).send();
        return;
      } 
    } 
    if (err.code === 11000) {
      if ('cpf' in err.keyPattern){
        req.session[req.body.cpf] = {cpf: 'CPF já consta no cadastro!'};
        req.session.save();
        res.status(204).send();
        return;
      } 
    } 
    else {
      console.log(err);
      res.render('404');
    }
  });
}

// DELETE
exports.delete_contact = (req, res) => {
  Contact.findByIdAndDelete(req.params._idContact)
  .then( () => {
    res.status(204).send();
    }).catch( err => {
      console.log(err);
      res.render('404');
    });
};

// CREATE SCHEDULE
exports.create_schedule = (req, res) => {
  
  Schedule.create({
    name: req.body.name,
    surname: req.body.surname,
    id: req.params._idContact,
    type: req.body.type,
    start: req.body.start,
    end: req.body.end,
    title: req.body.title,
    allDay: false,
    extendedProps: {
      tipo: req.body.type,
      nome: req.body.name,
      sobrenome: req.body.surname,
      id: req.params._idContact,
    },
    url: `/api/mostrar/evento/${req.params._idContact}`,
    className: 'contact-event-$',
  })
  .then((data) => {
    // console.log(data);
    req.session[req.params._idContact] = {schedule: 'Tarefa agendada no cadastro!'};
    req.session.save();
    res.status(204).send();
    return;
  })
  .catch(err => {
    console.log(err);
  });
}
