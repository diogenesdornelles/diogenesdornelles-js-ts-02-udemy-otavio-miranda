// EXAMPLE:
exports.middlewareGlobal = (req, res, next) => {
  res.locals.oneVariableLocal = 'This is a value of local variable in middleware'; // variável acessível em todas rotas
  if (req.body.nome) {
    console.log(`usuário logado ${req.body.nome}`)
  }
  next()
}