import getDataAPI from './getdata'
import renderResult from './renderer'
import { renderResultErr } from './renderer'
import { BuscaCEP } from './cepLib'
import { listenToEvSendForm, listenToEvBtnBuscar } from './listeners'

listenToEvSendForm()
listenToEvBtnBuscar()

export async function mainApp(cep){
  try {
    const buscador = new BuscaCEP(cep)
    buscador.result = await getDataAPI(buscador.cep)
    renderResult(buscador.result)
  } catch (err) {
    renderResultErr('Falha ao buscar dados junto ao servidor')
    return console.log(err)
  }
}