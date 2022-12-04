const { Contact } = require('../models/ContactModel');

exports.apiSendAdviceRegister = (req, res) => {
  res.status(200).json(req.session.validateUser); 
} 

exports.apiSendAdviceLogin = (req, res) => {
  res.status(200).json(req.session.validateLogin); 
} 

exports.apiSearchByCPFNumber = (req, res) => {

}

exports.apiSearchByName = (req, res) => {
  
}

exports.apiSendAdviceContact = (req, res) => {
  res.status(200).json(req.session.validateContact); 
} 

