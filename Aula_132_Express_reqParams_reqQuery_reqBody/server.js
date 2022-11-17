// npm i express
const express = require('express')
const app = express()
const fs = require('fs').promises
app.use(
  express.urlencoded(
    {
     extended: true 
    }
  )
)

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

// req.params contains route parameters (in the path portion of the URL).
// req.query contains the URL query parameters (after the ? in the URL). GET method

// req.params
// http://localhost:3000/testRouteUser/:idUser?/:nameUser?

// req.query
// http://localhost:3000/testRouteUser/?nome=diogenes&sobrenome=dornelles&idade=37

// exemplo:
//                       /  route /route/ queries  
//      home directory  /        /user /query string: par de chave e valor. Interrogação inicial uma query string. Após ? (interrogação inicial) deve-se usar & (e)
// https://facebook.com/profiles/12345/?campanha=googleads&interestings=marketplace


async function getHtml(){
  const result = await fs.readFile('./index.html');
  return result.toString()
}

app.get('/', async (req, res) => {
  const html = await getHtml()
  res.send(html)
})

// '/:' - declara parâmetro. Com '?' interrogação ao final, parâmetro fica opcional
app.get('/testRouteUser/:idUser?/:nameUser?', (req, res) => {
  console.log(req.params)
  if (req.params.idUser && req.params.nameUser) {
    res.send(`Olá novo usuário: ${req.params.nameUser} (${req.params.idUser})`)
  } else res.send(`Olá usuário`);
  console.log(req.query);
})

// req.body = corpo da requisição. Há de ter configuração específica para receber dados. Ver 4ª linha acima = app.use().
// retorna um objeto, cujas chaves são os valores dos attrs dos elementos inputs
app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Received form data')
})

app.get('/contato', (req, res) => {
  res.send('Obrigado pelo contato')
})

app.listen(3000, () => {
  console.log('Acces http://localhost:3000');
  console.log('listening...')
})
