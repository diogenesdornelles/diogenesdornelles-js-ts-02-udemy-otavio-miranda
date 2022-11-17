exports.middlewarGlobal = (req, res, next) => {
  if (req.body.nome) {
    console.log(`Bem-vindo ${req.body.nome}`)
  }
  next()
}