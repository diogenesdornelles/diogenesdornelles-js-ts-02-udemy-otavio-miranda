// prevent default behavior in forms from contactbook application
export default function initForm (){
  setTimeout(() => {
    const form1 = document.querySelector('.form-new-contact');
    const form2 = document.querySelector('.form-update-contact');
    const form3 = document.querySelector('.form-schedule-contact');
    form1.addEventListener('submit', onSubmitForm);
    form2.addEventListener('submit', onSubmitForm);
    form3.addEventListener('submit', onSubmitForm);
  }, 200);
  function onSubmitForm(event) { 
    event.preventDefault();
  }
}

