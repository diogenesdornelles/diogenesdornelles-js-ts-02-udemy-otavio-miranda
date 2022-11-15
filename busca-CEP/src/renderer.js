
const div = document.querySelector('.result')

function insertKeyHTML(key){
  const div = document.createElement('div')
  div.setAttribute('class', 'result-key')
  div.innerText = key.toUpperCase()
  return div
}

function insertValueHTML(value){
  const div = document.createElement('div')
  div.setAttribute('class', 'result-value')
  div.innerText = value
  return div
}

export default function renderResult(result){
  for (let key in result){
    let div1 = insertKeyHTML(key)
    let div2 = insertValueHTML(result[key])
    div.appendChild(div1)
    div.appendChild(div2)
  }
}

export function removePreviouslyQuery(){
  div.innerHTML = '';
}

export function renderResultErr (text){
  div.innerText = text;
}
