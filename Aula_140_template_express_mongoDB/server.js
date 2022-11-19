require('dotenv').config()
const express = require('express');
const routes = require('./routes');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNSTRING)
  .then(() => {
    app.emit('ready');
  })
  .catch((err) => {
    console.error(err)
  })

const  { middlewareGlobal } = require('./src/middlewares/middleware');

const viewsFullPath = path.resolve(__dirname, 'src', 'views');
const staticsFullPath = path.resolve(__dirname, 'public');

app.set('views', viewsFullPath);
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(middlewareGlobal); 
app.use(routes);
app.use(express.static(staticsFullPath));

app.on('ready', () => {
  app.listen(3000, () => {
    console.log('Access http://localhost:3000');
    console.log('Listening...');
  })
})
