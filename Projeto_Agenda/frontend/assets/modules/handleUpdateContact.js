import handleFrontEnd from "./handleFrontEnd";

function saveModifies (id) {
  const _name = document.querySelector('#new-name');
  const surname = document.querySelector('#new-surname');
  const email = document.querySelector('#new-email');
  const phone = document.querySelector('#new-phone');
  const birthday = document.querySelector('#new-birthday');
  const cpf = document.querySelector('#new-cpf');
  let genderOption;
  const _csrf = document.querySelector('.header-table ._csrf');

  if (document.querySelector('#new-gender-male').checked) {
    genderOption = 'masculino';
  } else if (document.querySelector('#new-gender-female').checked) {
    genderOption = 'feminino';
  }
  
  const arrayEls = [_name.checkValidity(), surname.checkValidity(), email.checkValidity(), phone.checkValidity(), birthday.checkValidity(), cpf.checkValidity()];
  if (arrayEls.includes(false)) return;

  axios.put(`/update/contato/${id}`, {
    _csrf:  _csrf.dataset.csrftoken,
    name: _name.value,
    surname: surname.value,
    email: email.value,
    phone: phone.value,
    birthday: `${birthday.value}T00:00`,
    gender: genderOption,
    cpf: cpf.value,
  })
  .then(response => {
    // console.log(response);
    handleFrontEnd(`contact`, cpf.value);
  }).catch(error => console.log(error));
}

async function configureUIModal(modal){
  modal.style.display = "flex";
  modal.style.flexDirection = "column";
  modal.style.width = '40vw';
  modal.style.position = "absolute";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
}

async function setDataOnFields(lis) {
  const _name = document.querySelector('#new-name');
  const surname = document.querySelector('#new-surname');
  const email = document.querySelector('#new-email');
  const phone = document.querySelector('#new-phone');
  const birthday = document.querySelector('#new-birthday');
  const cpf = document.querySelector('#new-cpf');
  const infos = [];
  lis.forEach((li) => {
    infos.push(li.innerText);
  })
  _name.value = infos[0];
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
}

export default function handleUpdateContact(element) {
    const modal = document.querySelectorAll('DIALOG')[0];
    modal.showModal();
    configureUIModal(modal);
    const ul = element.parentNode.parentNode;
    const lis = ul.querySelectorAll('LI:not(.li-btns)');
    setDataOnFields(lis);
    const btnClose = document.querySelector('#dialog-btn-close');
    btnClose.onclick = () => 
    {
    modal.close();
    modal.style.display = 'none';
    const id = element.dataset.id;  
    const btnSend = document.querySelector('#dialog-btn-send');
    btnSend.addEventListener('click', () => saveModifies(id), {once: true});
  };
}