const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');

// middlewares: são instruções que sucedem a requisição do cliente.

route.get('/', homeController.homePage);

route.post('/', homeController.homePageFormPost);

route.get('/contato', contatoController.contatoPage);

module.exports = route;