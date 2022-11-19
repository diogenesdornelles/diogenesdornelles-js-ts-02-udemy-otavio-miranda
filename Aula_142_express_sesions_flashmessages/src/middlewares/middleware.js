// EXAMPLE:
exports.middlewareGlobal = (req, res, next) => {
  if (req.body.nome) {
    console.log(`usuário logado ${req.body.nome}`)
  }
  next()
}