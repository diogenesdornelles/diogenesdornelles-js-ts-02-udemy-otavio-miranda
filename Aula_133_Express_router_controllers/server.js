const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}))
// Importando as rotas da aplicação e as utilizando.
const routes = require('./routes');
app.use(routes);

app.listen(3000, () => {
  console.log('Acces http://localhost:3000');
  console.log('listening...');
})


// criar separação de rotas da aplicação em arquivo (Router). Ver routes.js

// definir padrão Full Model View Controller (Full MVC) com Controllers