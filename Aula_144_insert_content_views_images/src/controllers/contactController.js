const ValidateMessage = require('../models/ContactModel');

// renderizar HTML
exports.contactPage = (req, res) => {
  res.render('contact', {
    title: 'Contato',    
  });
}

// // obter dados form via post
exports.contactForm = (req, res, next) => {
  const msg = new ValidateMessage(
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.mensagem,
  )
  msg.saveMessageDB();
  next();
}

exports.formSended = (req, res, next) => {
  res.render('formSended', {
    result: 'Formulário enviado! Obrigado pela mensagem!', 
    title: 'Sucesso',
  }
  );
  return;
}


    