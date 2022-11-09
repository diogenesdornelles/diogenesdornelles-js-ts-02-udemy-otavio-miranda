import { requisition } from './module1'

export default function getDataAPI(cep){
  return fetch(`http://viacep.com.br/ws/${cep}/json/`, requisition.method)
  .then((data) => data.json())
  .catch((err) => console.log(err))
}


