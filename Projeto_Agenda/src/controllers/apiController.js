const { Schedule } = require('../models/ScheduleModel');

exports.get_advice_register = (req, res) => {
  while (typeof req.session[req.params.userName] === undefined) {
    console.log('data back', req.session)
    setTimeout(() => {}, 500)
  }
  res.status(200).json(req.session[req.params.userName]); 
  delete req.session[`${req.params.userName}`];
  req.session.save();
} 

exports.get_advice_login = (req, res) => {
  while (typeof req.session[`${req.params.userName}`] === undefined) {
    setTimeout(() => {}, 500)
  }
  res.status(200).json(req.session[`${req.params.userName}`]); 
  delete req.session[`${req.params.userName}`];
  req.session.save();
} 

exports.get_advice_contact = (req, res) => {
  while (typeof req.session[req.params.cpf] === undefined) {
    setTimeout(() => {}, 500)
  }
  res.status(200).json(req.session[req.params.cpf]); 
  delete req.session[req.params.cpf];
  req.session.save();
} 

exports.get_advice_schedule = (req, res) => {
  while (typeof req.session[req.params._idContact] === undefined) {
    setTimeout(() => {}, 500)
  }
  res.status(200).json(req.session[req.params._idContact]); 
  delete req.session[req.params._idContact];
  req.session.save();
} 

exports.get_agenda = (req, res) => {
  Schedule.find().sort({ start: 1 })
  .then( data => {
    // console.log(data);
    res.status(200).json(data); 
    }).catch( err => {
      console.log(err);
      res.render('404');
    });
}

exports.get_agenda_contact = (req, res) => {
  if (req.params.value === 'true'){
    Schedule.findOne({
      id: req.params._idContact
    })
    .then( response => {
      // console.log(response);
      res.render('event', {infos: response}); 
      }).catch( err => {
        console.log(err);
        res.render('404');
      });
  } else {
    res.status(204).send();
  }
}




