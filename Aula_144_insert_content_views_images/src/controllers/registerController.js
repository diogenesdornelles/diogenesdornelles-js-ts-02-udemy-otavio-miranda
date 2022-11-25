const { ValidateNewUser } = require('../models/RegisterModel');

// renderizar HTML
exports.registerPage = (req, res) => {
  res.render('register', {
    title: 'Registrar',    
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
      if (result.valid) {
        res.render('formSended', {
          result: 'Usuário cadastrado com sucesso!', 
          title: 'Sucesso',
          }
        )
      } else {
        res.status(204).send();
      }
    })
    .catch(err => console.log(err));
}



    