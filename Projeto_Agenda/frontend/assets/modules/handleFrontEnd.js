import { hiddenInsertNewPerson, clearInputs, loadTableContacts } from "./contactBookApp";

export default async function handleFrontEnd(url, param) {
  const urlLoadContacts = `/agenda/contatos`;
  setTimeout(() => {
    axios.get(`/api/advice/${url}/${param}`)
      .then(response => {
        let text = '';
        console.log('data received', response.data)
        for (const key in response.data){
          if (response.data[key]) {
            text += response.data[key] + '\n'
          }
        } 

        if (text.includes('salvo')){
          alert(text);
          clearInputs();
          loadTableContacts(urlLoadContacts);
          hiddenInsertNewPerson();
          return;
        }

        if (text.includes('atualizado')){
          alert(text);
          clearInputs();
          const modal = document.querySelector('DIALOG');
          modal.close();
          modal.style.display = 'none';
          loadTableContacts(urlLoadContacts);
          hiddenInsertNewPerson();
          return;
        }

        if (text.includes('autenticado')){
          alert(text);
          clearInputs();
          return;
        }

        if (text.includes('criado')){
          alert(text);
          clearInputs();
          return;
        }

        if (text !== ''){
          alert(text);
        }
      })
      .catch(error => console.log(error));
  }, 300)
}
