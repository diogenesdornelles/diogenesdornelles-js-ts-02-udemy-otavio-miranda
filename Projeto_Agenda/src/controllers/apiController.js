exports.apiSendAdviceRegister = (req, res) => {
  res.status(200).json(req.session.validateUser); 
} 

exports.apiSendAdviceLogin = (req, res) => {
  res.status(200).json(req.session.validateLogin); 
} 
