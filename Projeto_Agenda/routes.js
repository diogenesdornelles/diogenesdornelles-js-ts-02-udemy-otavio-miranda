const express = require('express');
const route = express.Router();

const indexController = require('./src/controllers/indexController');
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
const contactBookController = require('./src/controllers/contactBookController');

route.get('/', indexController.indexPage);

route.get('/home', homeController.homePage);

route.get('/entrar', loginController.loginPage);

route.get('/registrar', registerController.registerPage);

route.get('/agenda', contactBookController.contactBookPage);

module.exports = route;