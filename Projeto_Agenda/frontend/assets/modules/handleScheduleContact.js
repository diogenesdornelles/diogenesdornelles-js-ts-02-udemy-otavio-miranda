import handleFrontEnd from "./handleFrontEnd";
import clearInputs from "./clearInputs";

function validateInputs(array) {
  array.forEach(el => {
    if (!el.checkValidity()) return false;
  })
  return true;
}

function saveSchedule (id) {
  
  const _name = document.querySelector('#schedule-name');
  const surname = document.querySelector('#schedule-surname');
  const date = document.querySelector('#date');
  const time = document.querySelector('#time');
  const service = document.querySelector('#service-options');
  const message = document.querySelector('#message');

  const _csrf = document.querySelector('.header-table ._csrf');
  
  const arrayEls = [_name, surname, date, time, service, message];
  if (!validateInputs(arrayEls)) return;

  axios.post(`/agenda/servicos/${id}`, {
    _csrf: _csrf.dataset.csrftoken,
    name: _name.value,
    surname: surname.value,
    date: date.value,
    time: time.value,
    service: service.value,
    message: message.value,
  })
  .then(response => {
    console.log(response);
    handleFrontEnd(`service`, id);
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
  const _name = document.querySelector('#schedule-name');
  const surname = document.querySelector('#schedule-surname');
  const infos = [];
  lis.forEach((li) => {
    infos.push(li.innerText);
  })
  _name.value = infos[0];
  surname.value = infos[1];
}

export default async function handleScheduleContact(element) {
  try {
    const modal = document.querySelectorAll('DIALOG')[1];
    console.log(modal);
    modal.showModal();
    await configureUIModal(modal);
    const ul = element.parentNode.parentNode;
    const lis = ul.querySelectorAll('LI:not(.li-btns)');
    await setDataOnFields(lis);
    const id = element.dataset.id;  
    const btnSend = document.querySelector('#dialog-btn-send-schedule');
    btnSend.addEventListener('click', () => saveSchedule(id));
    const btnClose = document.querySelector('#dialog-btn-close-schedule');
    btnClose.onclick = () => 
    {
    modal.close();
    modal.style.display = 'none';
    clearInputs();
  };
  } catch (e) {
    console.log(e);
  }
}