import { hiddenInsertNewPerson, clearInputs, loadTableContacts } from "./contactBookApp";

export default function getAlert(url, name = '') {
  const urlLoadContacts = `/agenda/contatos`;
  setTimeout(() => {
    axios.get(`/api/advice/${url}/${name}`)
      .then(response => {
        let text = '';
        
        for (const key in response.data){
          if (response.data[key]) {
            text += response.data[key] + '\n'
          }
        } 

        if (text.includes('salvo')){
          alert(text);
          clearInputs();
          hiddenInsertNewPerson();
          loadTableContacts(urlLoadContacts);
          return;
        }

        if (text.includes('atualizado')){
          alert(text);
          clearInputs();
          hiddenInsertNewPerson();
          const modal = document.querySelector('DIALOG');
          modal.close();
          modal.style.display = 'none';
          loadTableContacts(urlLoadContacts);
          return;
        }

        if (text.includes('autenticado') || text.includes('criado')){
          alert(text);
          clearInputs();
          return;
        }

        if (text !== ''){
          alert(text);
        }
      })
      .catch(error => console.log(error));
  }, 500)
}
