const express = require('express');
const route = express.Router();

const indexController = require('./src/controllers/indexController');
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
const contactBookController = require('./src/controllers/contactBookController');
const apiController = require('./src/controllers/apiController');

route.get('/', indexController.get_index_page);

route.get('/home:load?', homeController.get_home_page);

route.get('/entrar/:load?', loginController.get_login_page);

route.post('/entrar', loginController.post_login_form);

route.get('/registrar:load?', registerController.get_register_page);

route.post('/registrar', registerController.post_register_user);

route.delete('/delete/contato/:_idContact', contactBookController.delete_contact);

route.get('/agenda/contatos', contactBookController.get_all_contacts);

route.get('/agenda/searchContact/CPF/:cpfNumber?', contactBookController.get_contact_by_cpf);

route.get('/agenda/searchContact/name/:name?', contactBookController.get_contact_by_name);

route.get('/agenda/:load?/:_idUser?', contactBookController.get_contactBook_page);

route.post('/agenda', contactBookController.create_contact);

route.put('/update/contato/:_idContact', contactBookController.update_contact);

route.get('/api/advice/register', apiController.get_advice_register);

route.get('/api/advice/login', apiController.get_advice_login);

route.get('/api/advice/contact', apiController.get_advice_contact);

module.exports = route;