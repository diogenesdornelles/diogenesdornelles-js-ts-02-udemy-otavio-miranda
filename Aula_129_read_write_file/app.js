const writeFile = require('./modules/writeFile');
const _readFile = require('./modules/readFile');

const path = require('path');
const pathFileJson = path.resolve(__dirname, 'test.json');

const persons = [
  {name: "John", age: 30, city: "New York"},
  {name: "Anah", age: 47, city: "Louisianna"}
];

async function readArc(_path) {
  const loadedData = await _readFile(_path)
  const result = JSON.parse(loadedData)
  console.log(result); // object
  return result
}

const data = readArc(pathFileJson)
console.log(data); // Promise { <pending> }