const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const contactController = require('./src/controllers/contactController');
const aboutController = require('./src/controllers/aboutController');
const productsController = require('./src/controllers/productsController');
const networkController = require('./src/controllers/networkController');
const loginController = require('./src/controllers/loginController');
const commentsController = require('./src/controllers/commentsController');
const registerController = require('./src/controllers/registerController');


// HOMEPAGE GET

route.get('/', homeController.homePage);

// CONTACT GET

route.get('/contato', contactController.contactPage);

// CONTACT POST

route.post('/contato', contactController.contactForm, contactController.formSended);

// ABOUT GET

route.get('/sobre', aboutController.aboutPage);

// PRODUCTS GET

route.get('/produtos', productsController.productsPage);

// NETWORK GET

route.get('/redes', networkController.networkPage);

// LOGIN GET

route.get('/login', loginController.loginPage);

// CONTACT POST

//route.post('/login', loginController.loginForm);


// COMMENTS GET

route.get('/comentarios', commentsController.commentsPage);

// COMMENTS POST

route.post('/comentarios', commentsController.commentsForm, commentsController.commentsPage);

// REGISTER GET

route.get('/registrar', registerController.registerPage);

// REGISTER POST

route.post('/registrar', registerController.registerForm, registerController.formSended);


module.exports = route;