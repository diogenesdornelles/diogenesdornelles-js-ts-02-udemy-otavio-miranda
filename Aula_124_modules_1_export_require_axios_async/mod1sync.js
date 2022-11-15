let nome = 'dio';
let sobrenome = 'dornelles';

class Pessoa{
  constructor(nome, sobrenome) {
    this.nome = nome;
    this.sobrenome = sobrenome;
  }
}

console.log('1º - ', 'Hello World');

const p1 = new Pessoa('Jojo', 'Dornelles')
console.log('2º - ', p1)

const fs = require('node:fs')
const path = require('node:path')

const fullPath1 = path.format({
  root: '/ignored',
  dir: __dirname,
  base: 'note1.txt'
});

const fullPath2 = path.format({
  root: '/ignored',
  dir: __dirname,
  base: 'note2.txt'
});

const callTxtDB1 = () => { fs.readFile(fullPath1, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else console.log('3º - ', data);
});
}

callTxtDB1()

const callTxtDB2 = () => { fs.readFile(fullPath2, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else console.log('4º - ', data);
});
}

const falaNome = () => `${nome} ${sobrenome}`;

console.log('5º - ', falaNome())

callTxtDB2()

console.log('6º - ', 'Hello World again');

const p2 = new Pessoa('Tato', 'Dornelles')
console.log('7º - ', p2)

module.exports.nome = nome;
exports.sobrenome = sobrenome;
this.falaNome = falaNome;
exports.Pessoa = Pessoa;
