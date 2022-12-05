const express = require('express');
const route = express.Router();

const indexController = require('./src/controllers/indexController');
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
const contactBookController = require('./src/controllers/contactBookController');
const apiController = require('./src/controllers/apiController');

route.get('/', indexController.indexPage);

route.get('/home:load?', homeController.homePage);

route.get('/entrar/:load?', loginController.loginPage);

route.post('/entrar', loginController.loginForm);

route.get('/registrar:load?', registerController.registerPage);

route.post('/registrar', registerController.registerUser);

route.get('/agenda/:load?/:_idUser?', contactBookController.contactBookPage);

route.post('/agenda', contactBookController.insertContact);

route.get('/api/advice/register', apiController.apiSendAdviceRegister);

route.get('/api/advice/login', apiController.apiSendAdviceLogin);

route.get('/api/searchContact/CPF/:cpfNumber?', apiController.apiSearchByCPFNumber);

route.get('/api/searchContact/name/:name?', apiController.apiSearchByName);

route.get('/api/advice/contact', apiController.apiSendAdviceContact);

route.get('/api/loadContacts', apiController.apiLoadContacts);


module.exports = route;