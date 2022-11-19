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

  
const session = require('express-session');
const MongoDBStore = require('express-mongodb-session')(session);
const flash = require('connect-flash');

const  { middlewareGlobal } = require('./src/middlewares/middleware');

const viewsFullPath = path.resolve(__dirname, 'src', 'views');
const staticsFullPath = path.resolve(__dirname, 'public');

app.set('views', viewsFullPath);
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(middlewareGlobal); 
app.use(routes);
app.use(express.static(staticsFullPath));

const store = new MongoDBStore({
  uri: process.env.CONNSTRING,
  collection: 'mySessions'
});

store.on('error', function(error) {
  console.log(error);
});

app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));

app.get('/', function(req, res) {
  res.send('Hello ' + JSON.stringify(req.session));
});


// const sessionOptions = session({
//   secret: 'story book',
//   store: MongoStore.create({
//     mongoUrl: process.env.CONNSTRING,
//     collection: "usersessions",
// }),
//   resave: false,
//   name: "SessionCookieStore",

//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 7,
//     httpOnly: true,
//     secure: true,
//   },
// });

//app.use(sessionOptions);
app.use(flash());

app.on('ready', () => {
  app.listen(3000, () => {
    console.log('Access http://localhost:3000');
    console.log('Listening...');
  })
});

// npm install express-session connect-mongo connect-flash express-mongodb-session
// configure session

//https://www.npmjs.com/package/express-mongodb-session