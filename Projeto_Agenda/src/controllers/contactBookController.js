const { User } = require('../models/UserModel');

exports.contactBookPage = (req, res) => {
  console.log(req.params)
  if (req.params.load === 'contactBookPage') {
  res.render('contactBook', {
    result: null, 
    logged: null, 
    user: null, 
    _id: null, 
  });
  } else {
    res.render('index', {
      title: ''
    });
  }
}