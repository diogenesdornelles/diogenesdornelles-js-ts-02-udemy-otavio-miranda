import handleFrontEnd from "./handleFrontEnd";

export function hiddenInsertNewPerson(){
  const formInsert = document.querySelector('.form-insert-new-person'); 
  const divClose = document.querySelector('.div-close'); 
  formInsert.style.display = 'none';
  divClose.style.display = 'none';
}

export function clearInputs(){
  const inputs = document.querySelectorAll('INPUT');
  inputs.forEach(element => element.value = '');
}

export function loadTableContacts(url) {
  setTimeout(() => {
    axios.get(url)
    .then(response => {
      document.querySelector('.index #table-contacts').innerHTML = response.data;
    })
    .catch(error => console.log(error));
    }, 500)
}


function validateInputs(array) {
  array.forEach(el => {
    if (!el.checkValidity()) return false;
  })
  return true;
}

export default function handleContactBookApp() {

  const urlLoadContacts = `/agenda/contatos`;

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
      } 
    }
  }

  function handleUpdateContact(element) {
    
    function saveModifies () {

      const _csrf = document.querySelector('.header-table ._csrf');
      let genderOption;
      if (document.querySelector('#new-gender-male').checked) {
        genderOption = 'masculino';
      } else if (document.querySelector('#new-gender-female').checked) {
        genderOption = 'feminino';
      }
      const birthday = document.querySelector('#new-birthday');

      const arrayEls = [name, surname, email, phone, birthday, cpf];
      if (!validateInputs(arrayEls)) return;

      axios.put(`/update/contato/${id}`, {
        _csrf:  _csrf.dataset.csrftoken,
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone: phone.value,
        birthday: `${birthday.value}T00:00`,
        gender: genderOption,
        cpf: cpf.value,
      })
      .then(response => {
        console.log(response);
        handleFrontEnd(`contact`, cpf.value);
      }).catch(error => console.log(error));
    }

    function configureUIModal(){
      modal.style.display = "flex";
      modal.style.flexDirection = "column";
      modal.style.width = '40vw';
      modal.style.position = "absolute";
      modal.style.top = "50%";
      modal.style.left = "50%";
      modal.style.transform = "translate(-50%, -50%)";
    }

    const modal = document.querySelector('DIALOG');
    modal.showModal();
    configureUIModal()
    const infos = [];
    const ul = element.parentNode.parentNode;
    const id = element.dataset.id;
    const lis = ul.querySelectorAll('LI:not(.li-btns)');
    lis.forEach((li) => {
      infos.push(li.innerText);
    })
    const name = document.querySelector('#new-name');
    const surname = document.querySelector('#new-surname');
    const email = document.querySelector('#new-email');
    const phone = document.querySelector('#new-phone');
    const birthday = document.querySelector('#new-birthday');
    const cpf = document.querySelector('#new-cpf');
    name.value = infos[0];
    surname.value = infos[1];
    email.value = infos[2];
    phone.value = infos[3];
    birthday.value = `${infos[4].slice(-4,)}-${infos[4].slice(3, 5)}-${infos[4].slice(0, 2)}`;
    const gender = infos[5];
    if (gender === 'masculino') {
      document.querySelector('#new-gender-male').checked = true;
      document.querySelector('#new-gender-female').checked = false;
    } else {
      document.querySelector('#new-gender-male').checked = false;
      document.querySelector('#new-gender-female').checked = true;
    }
    cpf.value = infos[6];
    
    const btnSend = document.querySelector('#dialog-btn-send');
    btnSend.addEventListener('click', saveModifies);
    const btnClose = document.querySelector('#dialog-btn-close');
    btnClose.onclick = () => 
    {
    modal.close();
    modal.style.display = 'none';
    };
  }

  function handleSaveContact() {
 
    const _csrf = document.querySelector('.header-table ._csrf');
    const name = document.querySelector('#contact-name');
    const surname = document.querySelector('#contact-surname');
    const email = document.querySelector('#contact-email');
    const phone = document.querySelector('#contact-phone');
    const birthday = document.querySelector('#contact-birthday');
    const cpf = document.querySelector('#contact-cpf');
    let genderOption;
    if (document.querySelector('#contact-gender-male').checked) {
      genderOption = 'masculino';
    } else if (document.querySelector('#contact-gender-female').checked) {
      genderOption = 'feminino';
    }

    const arrayEls = [name.checkValidity(), surname.checkValidity(), email.checkValidity(), phone.checkValidity(), birthday.checkValidity(), cpf.checkValidity()];
    if (arrayEls.includes(false)) return;
    else {
      axios.post(`/agenda`, {
        _csrf: _csrf.dataset.csrftoken,
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone: phone.value,
        birthday: `${birthday.value}T00:00`,
        gender: genderOption,
        cpf: cpf.value,
      })
      .then(response => {
        console.log(response);
        handleFrontEnd(`contact`, cpf.value);
      }).catch(error => console.log(error)) 
    }
  }

    

  function handleDeleteContact(element) {
    const _csrf = document.querySelector('.header-table ._csrf');
    const id = element.dataset.id;
    let reqURLId = `/delete/contato/${id}`;
    axios.delete(reqURLId, {
      data: {_csrf: _csrf.dataset.csrftoken},
      headers: {
        'X-CSRFToken': _csrf.dataset.csrftoken,
      },
      withCredentials: true
    })
    .then(() => { 
      loadTableContacts(urlLoadContacts);
    })
    .catch((error) => {console.log(error)});
  }
  
  function handleSearch() {
    
    let reqURL;
    const value = document.querySelector('.container-contactBook #text-search').value;
    if (value){
      if (document.querySelector('.container-contactBook #option-search-cpf').checked) {
        reqURL = `/agenda/searchContact/CPF/${value.trim()}`
      } else {
        reqURL = `/agenda/searchContact/name/${value.trim()}`
      }
      loadTableContacts(reqURL);
      hiddenInsertNewPerson();
    } else {
      alert('Informe dados de pesquisa!')
    }
  }

  function handleLoad() {
    loadTableContacts(urlLoadContacts);
    hiddenInsertNewPerson();
  }

  function showInsertNewPerson(){
    const formInsert = document.querySelector('.form-insert-new-person'); 
    const divClose = document.querySelector('.div-close'); 
    formInsert.style.display = 'flex';
    divClose.style.display = 'flex';
  }

  function handleCopyContact(element){
    let infos = [];
    let data = ['Nome: ', 'Sobrenome: ', 'Email: ', 'telefone: ', 'Data de nascimento: ', 'Sexo: ', 'CPF: '];
    let text = '';
    const ul = element.parentNode.parentNode;
    const lis = ul.querySelectorAll('LI:not(.li-btns)');
    lis.forEach((li) => {
      infos.push(li.innerText);
    })
    infos.forEach((info, index) => {
      text += `${data[index]}${info} \n`;
    })
    navigator.clipboard.writeText(text);
    alert(`Dados do contato: \n ${text}`);
  }
}
