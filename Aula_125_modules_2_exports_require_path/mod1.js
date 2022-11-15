module.exports = function(x, y){
  return x * y;
}

const path = require('path');

console.log(__dirname)
console.log(__filename)

console.log(path.resolve(__dirname, '..', 'Aula_127_modules_2_exports_require_path', 'folder')) // retorna duas pastas