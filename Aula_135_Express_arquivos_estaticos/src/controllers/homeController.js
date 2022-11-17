// exibir HTML
exports.homePage = (req, res) => {
  res.render('index');
}

// tratar dados de form via post
exports.homePageFormPost = (req, res) => {
  res.send('Formulário enviado com sucesso')
  console.log(req.body)
}
