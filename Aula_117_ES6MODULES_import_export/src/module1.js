export const person = {
  nome: 'jojo',
  idade: 2,
}

export const person2 = {
  nome: 'Tato',
  idade: 7,
}

export function soma(a, b){
  return a + b;
}

export class Person{
  constructor(nome, idade){
    this.nome = nome;
    this.idade = idade;
  }
}

// export { person, person2, soma as default, Pessoa }; exportação por chaves

const cpf = 'jsdaiushdusd' // se não tiver export var é privativa ao módulo 

export default function sub(a, b){ // de função classe default, não precisa de chaves para importar
  return a - b;
}

