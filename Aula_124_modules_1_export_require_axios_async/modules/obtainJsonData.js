const axios = require('axios');

// axios('https://otaviomiranda.com.br/files/json/pessoas.json')
// .then(response => console.log(response.data))
// .catch(e => console.error(e))

module.exports = async () => {
  const result = await axios('https://otaviomiranda.com.br/files/json/pessoas.json')
  return result.data
}