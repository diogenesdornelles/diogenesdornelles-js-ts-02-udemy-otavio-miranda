const readFile = require('./modules/readFile')
const obtainJsonData = require('./modules/obtainJsonData')
const path = require('node:path')

let nome = 'dio';
let sobrenome = 'dornelles';

class Pessoa{
  constructor(nome, sobrenome) {
    this.nome = nome;
    this.sobrenome = sobrenome;
  }
}

const p1 = new Pessoa('Jojo', 'Dornelles')

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

const falaNome = () => `${nome} ${sobrenome}`;

const p2 = new Pessoa('Tato', 'Dornelles')

async function example() {
  try {
    const data1 = await obtainJsonData()
    console.log('1º - ', data1[1].nome)
    console.log('2º - ', 'Hello World');
    console.log('3º - ', p1);
    const data2 = await readFile(fullPath1)
    console.log('4º - ', data2);
    const data3 = await readFile(fullPath2)
    console.log('5º - ', data3);
    console.log('6º - ', falaNome())
    console.log('7º - ', 'Hello World again')
    console.log('8º - ', p2)
  } catch (err) {
    console.log(err);
  }
}

example()