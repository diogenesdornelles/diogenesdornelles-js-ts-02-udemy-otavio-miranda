const { User } = require('../models/RegisterModel');
const fs = require('fs');

function saveAdvice(data) {
  fs.writeFile('./src/models/db/adviceLogin.json', JSON.stringify(data), err => {
    if (err) {
      console.error(err);
    } else console.log('JSON data is saved.');
  });
}

function saveUser(data) {
  fs.writeFile(`./src/models/db/userLogged.json`, JSON.stringify(data), err => {
    if (err) {
      console.error(err);
    } else console.log('JSON data is saved.');
  });
}

// renderizar HTM
exports.loginPage = (req, res) => {
  let user;
  if (res.locals.loggedUser !== undefined) {
    user = res.locals.loggedUser.userName;
  } else {user = ''};
  res.render('login', {
    title: 'Login',
    user: user,
  });
}

// // obter dados form via post
exports.loginForm = (req, res, next) => {
  User.findOne({ 
    userName: `${req.body.usuario}` 
  })
  .then(data => {
    if (data) {
      if (data.password === req.body.senha) {
        let user;
        if (res.locals.loggedUser !== undefined) {
          user = res.locals.loggedUser.userName;
        } else {user = ''};
        res.render('formSended', {
          result: `Bem-vindo ${req.body.usuario}`, 
          title: 'Sucesso',
          user: user,
        })
        saveUser({
          id: data._id,
          name: data.name,
          cpf: data.cpf,
          lastname: data.lastname,
          userName: data.userName
        });
      } else {
         const validate = {
          attrName: 'senha',
          advice: 'Senha incorreta.'
        }
        saveAdvice(validate);
        res.status(204).send();
        };
    } else {
      const validate = {
        attrName: 'usuario',
        advice: 'Usuário incorreto.'
      }
      saveAdvice(validate);
      res.status(204).send();
      }
    }
  )
  .catch( err => console.log(err));
}

