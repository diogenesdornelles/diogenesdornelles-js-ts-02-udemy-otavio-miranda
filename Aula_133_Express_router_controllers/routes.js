// Define as rotas de controle da aplicação.
const express = require('express');
const route = express.Router();

// rotas definidas para home
const homeController = require('./controllers/homeController')
const contatoController = require('./controllers/contatoController')

route.get('/', homeController.homePage);

route.post('/', homeController.homePageFormPost);

// Rotas para contato

route.get('/contato', contatoController.contatoPage);

// exportando config
module.exports = route;