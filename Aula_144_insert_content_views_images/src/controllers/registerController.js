const { ValidateNewUser } = require('../models/RegisterModel');

// renderizar HTML
exports.registerPage = (req, res) => {
  let user;
  if (res.locals.loggedUser !== undefined) {
    user = res.locals.loggedUser.userName;
  } else {user = ''};
  res.render('register', {
    title: 'Registrar',  
    user: user,
  });
}

// // obter dados form via post
exports.registerForm = (req, res, next) => {
  const user = new ValidateNewUser(
    req.body.nome,
    req.body.sobrenome,
    req.body.cpf,
    req.body.usuario,
    req.body.senha,
    req.body.repetirSenha,
  )

  user.saveUserDB()
    .then((result) => {
      if (result) {
      let user;
      if (res.locals.loggedUser !== undefined) {
        user = res.locals.loggedUser.userName;
      } else {user = ''};
      res.render('formSended', {
        result: 'Usuário cadastrado com sucesso!', 
        title: 'Sucesso',
        user: user,
        }
      )
      } else {
        res.status(204).send();
      }
    })
    .catch(err => console.log(err));
}



    