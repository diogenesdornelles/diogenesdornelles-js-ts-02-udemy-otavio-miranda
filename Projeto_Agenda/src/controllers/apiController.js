exports.get_advice_register = (req, res) => {
  res.status(200).json(req.session.validateUser); 
  req.session.validateUser = {};
  req.session.save();
} 

exports.get_advice_login = (req, res) => {
  res.status(200).json(req.session.validateLogin); 
  req.session.validateLogin = {};
  req.session.save();
} 

exports.get_advice_contact = (req, res) => {
  res.status(200).json(req.session.validateContact); 
  req.session.validateContact = {};
  req.session.save();
} 
