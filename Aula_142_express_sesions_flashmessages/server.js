require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    app.emit('ready');
  })
  .catch(e => console.log(e));
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');

const { middlewareGlobal } = require('./src/middlewares/middleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
  secret: 'HBkjhbGKnbg33ccsxs22gbhFUKBGcrrvjhjvgvnjkjjvgvRRCdxhbJHNhV',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Nossos próprios middlewares
app.use(middlewareGlobal);
app.use(routes);

app.on('ready', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});


// "dependencies": {
//   "connect-flash": "^0.1.1",
//   "connect-mongo": "^4.4.1",
//   "core-js": "^3.15.2",
//   "css-loader": "^6.2.0",
//   "dotenv": "^10.0.0",
//   "ejs": "^3.1.6",
//   "express": "^4.17.1",
//   "express-session": "^1.17.2",
//   "mongoose": "^5.13.3",
//   "regenerator-runtime": "^0.13.9",
//   "style-loader": "^3.2.1"
// },