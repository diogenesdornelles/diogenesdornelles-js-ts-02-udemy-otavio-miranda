const mod1 = require('./mod1sync')
//const nome = require('./mod1').nome
const {nome, sobrenome, falaNome, Pessoa, txt} = require('./mod1sync')

console.log(nome)

console.log(sobrenome)

console.log(mod1.falaNome())

const p1 = new Pessoa('Jojo', 'Dornelles')
console.log(p1, txt)