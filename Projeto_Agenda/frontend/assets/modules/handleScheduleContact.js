import handleFrontEnd from "./handleFrontEnd";
import clearInputs from "./clearInputs";

function saveSchedule (id) {
  
  const _name = document.querySelector('#schedule-name');
  const surname = document.querySelector('#schedule-surname');
  const date = document.querySelector('#date');
  const timeStart = document.querySelector('#timestart');
  const timeEnd = document.querySelector('#timeend');
  const type = document.querySelector('#event-options');
  const title = document.querySelector('#title-event');
  const _csrf = document.querySelector('.header-table ._csrf');
  
  const arrayEls = [_name.checkValidity(), surname.checkValidity(), date.checkValidity(), timeStart.checkValidity(), timeEnd.checkValidity(), type.checkValidity(), title.checkValidity()];
  if (arrayEls.includes(false)) return;

  axios.post(`/salvar/evento/${id}`, {
    _csrf: _csrf.dataset.csrftoken,
    name: _name.value,
    surname: surname.value,
    start: `${date.value}T${timeStart.value}:00`,
    end: `${date.value}T${timeEnd.value}:00`,
    type: type.value,
    title: title.value,
  })
  .then(response => {
    // console.log(response);
    handleFrontEnd(`event`, id);
  }).catch(error => console.log(error));
}

function configureUIModal(modal){
  modal.style.display = "flex";
  modal.style.flexDirection = "column";
  modal.style.width = '45vw';
  modal.style.height = '75vh';
  modal.style.position = "absolute";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
}

function setDataOnFields(lis) {
  clearInputs();
  const _name = document.querySelector('#schedule-name');
  const surname = document.querySelector('#schedule-surname');
  const infos = [];
  lis.forEach((li) => {
    infos.push(li.innerText);
  })
  _name.value = infos[0];
  surname.value = infos[1];
}

export default function handleScheduleContact(element) {
    const modal = document.querySelectorAll('DIALOG')[1];
    modal.showModal();
    configureUIModal(modal);
    const ul = element.parentNode.parentNode;
    const lis = ul.querySelectorAll('LI:not(.li-btns)');
    setDataOnFields(lis);
    const btnClose = document.querySelector('#dialog-btn-close-schedule');
    btnClose.onclick = () => 
    {
    clearInputs();
    modal.close();
    modal.style.display = 'none';
    }
    const id = element.dataset.id;  
    const btnSend = document.querySelector('#dialog-btn-send-schedule');
    btnSend.addEventListener('click', () => saveSchedule(id), {once : true});
}
