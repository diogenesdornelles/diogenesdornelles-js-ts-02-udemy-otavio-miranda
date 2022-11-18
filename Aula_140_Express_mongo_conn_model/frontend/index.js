import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/styleHome.css';
import './assets/css/reset.css';
import './assets/css/styleSendedForm.css';

// frontend

function init() {
  const inputs = document.querySelectorAll("INPUT");
  inputs.forEach((el) => {
    el.value = "";
  })
}
window.onload = init;