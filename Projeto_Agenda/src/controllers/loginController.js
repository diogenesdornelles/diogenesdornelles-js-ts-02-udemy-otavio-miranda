
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
