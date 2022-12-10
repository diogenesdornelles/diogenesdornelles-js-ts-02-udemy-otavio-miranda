export default async function loadCsrf() {
  const csrfToken = document.querySelector('#csrfToken');
  const inputsHidden = document.querySelectorAll('input[name="_csrf"]');
  inputsHidden.forEach((el) => {el.value = csrfToken.innerText});
}
