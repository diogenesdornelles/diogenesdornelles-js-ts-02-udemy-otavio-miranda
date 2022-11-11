import getDataFieldsFromForm from './getDataFieldsFromForm'

export default function listenToEvSendForm(){
  const form = document.querySelector('.form')
  form.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON')
    e.preventDefault()
  })
}

export function listenToEvBtnGenerate(){
  const btn = document.querySelector('#btn-generate')
  return btn.addEventListener('click', getDataFieldsFromForm)
}