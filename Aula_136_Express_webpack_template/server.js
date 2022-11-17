const express = require('express');
const routes = require('./routes');
const path = require('path');
const app = express();
const  { middlewareGlobal } = require('./src/middlewares/middleware');
const viewsFullPath = path.resolve(__dirname, 'src', 'views');
const staticsFullPath = path.resolve(__dirname, 'public');

app.set('views', viewsFullPath);
app.set('view engine', 'ejs');
app.use(middlewareGlobal); 
app.use(routes);
app.use(express.urlencoded({extended: true}))

app.use(express.static(staticsFullPath))

app.listen(3000, () => {
  console.log('Acces http://localhost:3000');
  console.log('listening...');
})
