import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/styleHome.css';
import './assets/css/reset.css';

// frontend

function init() {
  // setting form data

  // clear inputs
  if (document.querySelector("FORM")) {
    const inputs = document.querySelectorAll("INPUT");
    inputs.forEach((el) => {
      el.value = "";
    })
    // load csrfToken on hidden inputs
    const csrfToken = document.querySelector('#csrfToken');
    const inputsHidden = document.querySelectorAll('input[name="_csrf"]');
    inputsHidden.forEach((el) => {el.value = csrfToken.innerText});
  }
}


window.onload = init;