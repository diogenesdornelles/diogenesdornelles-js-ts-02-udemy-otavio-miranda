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
    req.session[`${req.body.userName}`] = {user: 'Usuário criado no cadastro!'};
    req.session.save();
    res.status(204).send();
  })
  .catch(err => {
    if (err.code === 11000) {
      if ('cpf' in err.keyPattern){
        req.session[`${req.body.userName}`] = {cpf: 'CPF já consta no cadastro!'};
      } 
      if ('userName' in err.keyPattern){
        req.session[`${req.body.userName}`] = {user: 'Usuário já consta no cadastro!'};
      } 
    } 
    if (err.name === 'ValidationError'){
      if ('cpf' in err.errors) {
        req.session[`${req.body.userName}`] = {cpf: 'CPF inválido!'};
      } 
    } 
    if (req.body.password !== req.body.repPassword){
      req.session[`${req.body.userName}`] = {password: 'Senhas não conferem!'};
    } 
    req.session.save();
    res.status(204).send();
  });
}
