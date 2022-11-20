
// renderizar HTML
exports.homePage = (req, res, next) => {
  console.log(req.session.nameUser) // call storaged session.nameUser
  req.flash('Info', 'Olá mundo')
  res.render('index');
  return;
}

exports.homePageFormPost = (req, res, next) => {
  res.send('Formulário enviado com sucesso.');
  return;
}

exports.saveUser = (req, res, next) => {
  req.session.nameUser = req.body.nome;
  req.session.passUser = req.body.senha;
  req.session.loggedIn = true
  req.session.save()
  next();
}