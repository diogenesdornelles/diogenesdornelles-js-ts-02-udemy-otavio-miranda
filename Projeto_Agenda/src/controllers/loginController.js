const { User } = require('../models/UserModel');
// renderize HTML
exports.get_login_page = (req, res) => {
  if (req.params.load === 'loginPage') {
  res.render('login', {
    title: 'Entrar'
  });
  }
  else res.render('index', {
    title: ''
  });
}

exports.post_login_form = (req, res, next) => {
  User.findOne({ 
    userName: req.body.userName
  })
  .then(data => {
    if (data) {
      if (data.password === req.body.password) {
        req.session[`${req.body.userName}`] = {user: 'Usuário autenticado!'};
        res.render('index', { 
          logged: true,
          userName: data.userName,
          _idUser: data._id,
        })
      } else {
          req.session[`${req.body.userName}`] = {password: 'Senha incorreta!'};
          res.status(204).send();
        };
    } else {
      req.session[`${req.body.userName}`] = {user: 'Usuário incorreto!'};
      res.status(204).send();
      }
      req.session.save();
    } 
  )
  .catch( err => {console.log(err)
    res.status(204).send();
  });
}
