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

async function getHtml(){
  const result = await fs.readFile('./index.html');
  return result.toString()
}

async function loadHtml(){
  const result = await getHtml()
  app.get('/', (req, res) => {
    res.send(result)
  })
}

loadHtml()

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
