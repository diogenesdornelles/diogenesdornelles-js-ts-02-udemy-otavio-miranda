const express = require('express');
const routes = require('./routes');
const path = require('path');
const  { middlewarGlobal } = require('./src/middlewares/middleware');
const app = express();
const viewsFullPath = path.resolve(__dirname, 'src', 'views');
const staticsFullPath = path.resolve(__dirname, 'public');

app.use(express.urlencoded({extended: true}))
app.set('views', viewsFullPath);
app.set('view engine', 'ejs');
app.use(middlewarGlobal);
app.use(routes);
app.use(express.static(staticsFullPath));
app.listen(3000, () => {
  console.log('Acces http://localhost:3000');
  console.log('listening...');
})

