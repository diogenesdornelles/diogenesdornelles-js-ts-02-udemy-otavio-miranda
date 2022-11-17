const express = require('express');
const routes = require('./routes');
const path = require('path');
const app = express();
const viewsFullPath = path.resolve(__dirname, 'src', 'views');

// settando views
app.set('views', viewsFullPath);
app.set('view engine', 'ejs');

app.use(routes);
app.use(express.urlencoded({extended: true}))

app.listen(3000, () => {
  console.log('Acces http://localhost:3000');
  console.log('listening...');
})

// criar pasta src e nela localizar controllers e views

// setar views

// instalar engine: 'npm i ejs' ou outra
