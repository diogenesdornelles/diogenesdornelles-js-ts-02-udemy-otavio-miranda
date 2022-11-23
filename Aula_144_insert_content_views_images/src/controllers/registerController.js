const ValidateNewUser = require('../models/RegisterModel');

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
  const result = user.saveUserDB();
    if (result) {
      next();
    }
  }

exports.formSended = (req, res, next) => {
  res.render('formSended', {
    result: 'Usuário cadastrado com sucesso!', 
    title: 'Sucesso',
  }
  );
  return;
}


    