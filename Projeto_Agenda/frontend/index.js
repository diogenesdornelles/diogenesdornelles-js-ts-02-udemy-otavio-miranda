import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/styleHome.css';
import './assets/css/styleHeader.css';
import './assets/css/styleLogin.css';
import './assets/css/styleRegister.css';
import './assets/css/styleContactBook.css';
import './assets/css/reset.css';
import './assets/css/style.css';
import 'regenerator-runtime';
import spaAppConfig from './assets/modules/spaApp';
import handleContactBookApp from './assets/modules/contactBookApp';
import manageLoggedUser from './assets/modules/manageLoggedUser';
import getAlert from "./assets/modules/getAlert";
import loadImages from "./assets/modules/loadImages";
// frontend

function clearInputs() {
  if (document.querySelector("FORM")) {
    const inputs = document.querySelectorAll("INPUT");
    inputs.forEach((el) => {
      el.value = "";
    })
  }
}

function getBtn(el) {
  if (el.target.innerText.toLowerCase() === 'registrar' && el.target.tagName.toLowerCase() === 'button'){
    const userName = document.querySelector('#userName').value;
    getAlert('register', userName);
  } 
  if (el.target.innerText.toLowerCase() === 'logar' && el.target.tagName.toLowerCase() === 'button'){
    const userName = document.querySelector('#userName').value;
    getAlert('login', userName);
  }
}

async function init() {

  // initialize localStorage
  await manageLoggedUser();

  // initialize SPA
  await spaAppConfig();

  // load images 
  await loadImages();

  // clear inputs
  clearInputs();
  
  // controll contactbook application
  handleContactBookApp();
}

document.addEventListener('click', getBtn);
window.onload = init;
window.onclose = () => { 
  window.localStorage.removeItem("loggedUser")
};
