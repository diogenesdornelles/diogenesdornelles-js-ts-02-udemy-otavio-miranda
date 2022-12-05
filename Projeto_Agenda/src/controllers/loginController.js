const { User } = require('../models/UserModel');
// renderize HTML
exports.loginPage = (req, res) => {
  if (req.params.load === 'loginPage') {
  res.render('login', {
    title: 'Entrar'
  });
  }
  else res.render('index', {
    title: ''
  });
}

exports.loginForm = (req, res, next) => {
  function turnNullSession() {
    req.session.validateLogin = {}
  }
  User.findOne({ 
    userName: `${req.body.user}` 
  })
  .then(data => {
    if (data) {
      if (data.password === req.body.password) {
        res.render('index', { 
          logged: true,
          userName: data.userName,
          _idUser: data._id,
        })
      } else {
          turnNullSession();
          req.session.validateLogin.password = 'Senha incorreta.';
        };
    } else {
        turnNullSession();
        req.session.validateLogin.userName = 'Usuário incorreto.';
      }
    }
  )
  .catch( err => {console.log(err)
    res.status(204).send();
  }
  );
}
