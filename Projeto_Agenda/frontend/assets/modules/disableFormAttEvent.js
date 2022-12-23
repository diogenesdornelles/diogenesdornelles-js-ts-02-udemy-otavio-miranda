
export default function disableFormAttEvent () {
  const btnSave = document.querySelector('#btn-calendario-save');
  const date = document.querySelector('#date-contact-event');
  const timeStart = document.querySelector('#timestart-contact-event');
  const timeEnd = document.querySelector('#timeend-contact-event');
  const type = document.querySelector('#type-contact-event');
  const title = document.querySelector('#title-contact-event');
  btnSave.setAttribute('disabled');
  date.setAttribute('readonly');
  timeStart.setAttribute('readonly');
  timeEnd.setAttribute('readonly');
  type.setAttribute('disabled');
  title.setAttribute('readonly');
}
