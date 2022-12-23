export default function showInsertNewPerson(){
  const formInsert = document.querySelector('.form-insert-new-person'); 
  const form2 = document.querySelector('.form-new-contact');
  
  console.log(formInsert.getClientRects())
  
  
  const divClose = document.querySelector('.div-close'); 
  formInsert.style.display = 'flex';
  divClose.style.display = 'flex';
  window.scrollTo({ top: 300, behavior: 'smooth' });
  form2.scrollIntoView();
}
