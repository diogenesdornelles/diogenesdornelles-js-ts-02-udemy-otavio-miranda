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
