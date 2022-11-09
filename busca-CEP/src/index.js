import getDataAPI from './getdata'
import renderResult from './renderer'
import { removePreviouslyQuery, renderResultErr } from './renderer'



const form = document.querySelector('.form')
form.addEventListener('click', (e) => {
  e.preventDefault()
})

const btn = document.querySelector('.btn-buscar')
btn.addEventListener('click', getCEP)

class buscaCEP {
  constructor(cep){
    this.cep = cep
  }
}

function getCEP(){
  const input = document.querySelector('#value-cep').value
  removePreviouslyQuery()
  mainApp(input)
}

async function mainApp(cep){
  try {
    
    const buscador = new buscaCEP(cep)
    buscador.result = await getDataAPI(buscador.cep)
    renderResult(buscador.result)
  } catch (err) {
    renderResultErr('Falha ao buscar dados junto ao servidor')
    return console.log(err)
  }
}

