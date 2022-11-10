import { getCEPFromField } from './cepLib'

export function listenToEvSendForm(){
  const form = document.querySelector('.form')
  form.addEventListener('click', (e) => {
    e.preventDefault()
  })
}

export function listenToEvBtnBuscar(){
  const btn = document.querySelector('.btn-buscar')
  return btn.addEventListener('click', getCEPFromField)
}