const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController')
const contatoController = require('./src/controllers/contatoController')

route.get('/', homeController.homePage);

route.post('/', homeController.homePageFormPost);

route.get('/contato', contatoController.contatoPage);

module.exports = route;