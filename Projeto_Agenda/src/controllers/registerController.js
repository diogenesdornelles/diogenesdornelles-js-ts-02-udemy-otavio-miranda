const { User } = require('../models/UserModel');
// renderize HTML
exports.get_register_page = (req, res) => {
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

exports.post_register_user = (req, res) => {
  User.create({
    name: req.body.name,
    surname: req.body.surname,
    birthday: new Date(req.body.birthday),
    email: req.body.email,
    gender: req.body.gender,
    cpf: req.body.cpf,
    userName: req.body.userName,
    password: req.body.password,
    repPassword: req.body.repPassword,
  })
  .then((data) => {
    console.log(data);
    res.render('successRegister', {
      userName: data.userName,
    });
  })
  .catch(err => {
    if (err.code === 11000) {
      if ('cpf' in err.keyPattern){
        req.session.validateUser.cpf = 'CPF já consta no cadastro.';
      } 
      if ('userName' in err.keyPattern){
        req.session.validateUser.userName = 'Usuário já consta no cadastro.';
      } 
    } 
    if (err.name === 'ValidationError'){
      if ('cpf' in err.errors) {
        req.session.validateUser.cpf = 'CPF inválido.';
      } 
    } 
    if (req.body.password !== req.body.repPassword){
      req.session.validateUser.password = 'Senhas não conferem.';
    } 
    req.session.save();
    res.status(204).send();
  });
}
