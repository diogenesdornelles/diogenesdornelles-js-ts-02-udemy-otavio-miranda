const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const contactController = require('./src/controllers/contactController');

route.get('/', homeController.homePage);

route.post('/', homeController.homePageFormPost, homeController.homeSaveDataFormDB);

route.get('/contato', contactController.contactPage);

route.post('/contato', contactController.contactPageFormPost, contactController.contactSaveDataFormDB);

module.exports = route;