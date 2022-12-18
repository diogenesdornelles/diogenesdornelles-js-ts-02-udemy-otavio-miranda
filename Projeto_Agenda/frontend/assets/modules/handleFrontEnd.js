import hiddenInsertNewPerson from "./hiddenInsertNewPerson";
import clearInputs from "./clearInputs";
import loadTableContacts from "./loadTableContacts";

export default async function handleFrontEnd(url, param) {
  
  setTimeout(() => {
    axios.get(`/api/advice/${url}/${param}`)
      .then(response => {
        let text = '';
        for (const key in response.data){
          if (response.data[key]) {
            text += response.data[key] + '\n'
          }
        } 
        const modals = document.querySelectorAll('DIALOG');
        modals.forEach(modal => {
          if (typeof modal !== undefined && modal.style.display === 'flex') {
            modal.close();
            modal.style.display = 'none';
          }
        })
        const urlLoadContacts = `/agenda/contatos`;
        
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
          loadTableContacts(urlLoadContacts);
          hiddenInsertNewPerson();
          return;
        }

        if (text.includes('agendada')){
          alert(text);
          clearInputs();
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
