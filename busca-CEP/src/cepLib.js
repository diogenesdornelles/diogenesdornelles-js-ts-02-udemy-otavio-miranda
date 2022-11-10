import { removePreviouslyQuery } from './renderer'
import { mainApp } from './index'

export class BuscaCEP {
  constructor(cep){
    this.cep = cep
  }
}

export function getCEPFromField(){
  const input = document.querySelector('#value-cep').value
  removePreviouslyQuery()
  mainApp(input)  
}

