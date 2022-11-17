const express = require('express');
const routes = require('./routes');
const path = require('path');
const app = express();
const viewsFullPath = path.resolve(__dirname, 'src', 'views');
const staticsFullPath = path.resolve(__dirname, 'public');

app.set('views', viewsFullPath);
app.set('view engine', 'ejs');

app.use(routes);
app.use(express.urlencoded({extended: true}))

// settando pasta statics
app.use(express.static(staticsFullPath))

app.listen(3000, () => {
  console.log('Acces http://localhost:3000');
  console.log('listening...');
})

