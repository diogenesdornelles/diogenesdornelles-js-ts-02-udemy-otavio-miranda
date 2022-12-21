import handleSaveContact from "./handleSaveContact";
import handleUpdateContact from "./handleUpdateContact";
import handleSearch from "./handleSearch";
import handleDeleteContact from "./handleDeleteContact";
import handleCopyContact from "./handleCopyContact";
import handleLoad from "./handleLoad";
import handleScheduleContact from "./handleScheduleContact";
import showInsertNewPerson from "./showInsertNewPerson";
import hiddenInsertNewPerson from "./hiddenInsertNewPerson";
import handleFullCalendar from "./handleFullCalendar";
import clearInputs from "./clearInputs";


export default function handleContactBookApp() {

  document.addEventListener('click', handleOperations);

  function handleOperations(event){
    if (event.target.tagName.toLowerCase() === 'button' || event.target.tagName.toLowerCase() === 'a'){
      switch (event.target.innerText.toLowerCase()) {
        case 'buscar': handleSearch();
        break;
        case 'inserir contato': showInsertNewPerson();
        break;
        case 'limpar': clearInputs();
        break;
        case 'carregar lista': handleLoad();
        break;
        case 'fechar': hiddenInsertNewPerson();
        break;
        case 'enviar': handleSaveContact();
        break;
        case 'deletar': handleDeleteContact(event.target);
        break;
        case 'atualizar': handleUpdateContact(event.target);
        break;
        case 'copiar': handleCopyContact(event.target);
        break;
        case 'agendar': handleScheduleContact(event.target);
        break;
        case 'abrir agenda': handleFullCalendar();
        break;
      } 
    }
  }
}
