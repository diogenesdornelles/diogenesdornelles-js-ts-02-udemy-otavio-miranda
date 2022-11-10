
export default function preventSubmitForm(){
  const form1 = document.querySelector('.form-1'); 
  const form2 = document.querySelector('.form-2'); 
  form1.addEventListener('submit', onSubmitForm);
  form2.addEventListener('submit', onSubmitForm);
  
  function onSubmitForm(event) { 
    event.preventDefault();
  }
}
