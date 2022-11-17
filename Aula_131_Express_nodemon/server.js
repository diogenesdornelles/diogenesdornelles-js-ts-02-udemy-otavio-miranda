// npm i express
const express = require('express')
const app = express()
const fs = require('fs').promises

// Operações básicas de API
// CRUD -> CREATE READ UPDATE DELETE
//         POST   GET  PUT    DELETE 

// http://meusite.com/ <- GET -> Entregue a rota página principal
// http://meusite.com/sobre <- GET -> Entregue a rota sobre
// http://meusite.com/contato <- GET -> Entregue a rota contato

// primeiro parâmetro é a rota da página principal e callback, com valor de requisição do cliente e a resposta do servidor.

// npm i nodemon --save-dev
// on package.json:
// "scripts": {
//   "start": "nodemon server.js"
// npm start

async function getHtml(){
  const result = await fs.readFile('./index.html');
  return result.toString()
}

app.get('/', async (req, res) => {
  const html = await getHtml()
  res.send(html)
})

app.post('/', (req, res) => {
  res.send('Received form data')
})

app.get('/contato', (req, res) => {
  res.send('Obrigado pelo contato')
})

app.listen(3000, () => {
  console.log('Acces http://localhost:3000');
  console.log('listening...')
})
