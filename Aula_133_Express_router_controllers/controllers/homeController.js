// Camada controller da home
// A camada Controller (controlador) lida com as requisições dos usuários. 
// É responsável por retornar uma resposta com a ajuda das camadas Model e View.

const fs = require('fs').promises;

async function getHtmlHome(){
  const result = await fs.readFile('./index.html');
  return result.toString();
}

// exibir HTML
exports.homePage = async (req, res) => {
  const htmlHome = await getHtmlHome();
  res.send(htmlHome);
}

// tratar dados de form via post
exports.homePageFormPost = (req, res) => {
  res.send('Formulário enviado com sucesso')
  console.log(req.body)
}
