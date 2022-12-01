
// renderize HTML
exports.registerPage = (req, res) => {
  if (req.params.load === 'registerPage') {
  res.render('register', {
    title: 'Registro',
  });
  } else {
    res.render('index', {
      title: ''
    });
  }
}


exports.registerUser = (req, res) => {
  console.log(req.body)
  // OK
};

