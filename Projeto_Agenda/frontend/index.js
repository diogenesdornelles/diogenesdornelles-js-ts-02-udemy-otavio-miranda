import 'core-js/stable';
import 'regenerator-runtime';
import 'regenerator-runtime/runtime';
import './assets/css/reset.css';
import './assets/css/style.css';
import './assets/css/styleCalendar.css';
import './assets/css/styleContactBook.css';
import './assets/css/styleHeader.css';
import './assets/css/styleHome.css';
import './assets/css/styleIndex.css';
import './assets/css/styleLogin.css';
import './assets/css/styleRegister.css';
import handleFrontEnd from "./assets/modules/handleFrontEnd";
import initContactBookApp from './assets/modules/initContactBookApp';
import loadImages from "./assets/modules/loadImages";
import manageLoggedUser from './assets/modules/manageLoggedUser';
import spaAppConfig from './assets/modules/spaAppConfig';
import clearInputs from './assets/modules/clearInputs';
// frontend

function getBtn(el) {
  console.log(el)
  if (el.target.innerText.toLowerCase() === 'registrar' && el.target.tagName.toLowerCase() === 'button'){
    const userName = document.querySelector('#userName').value;
    handleFrontEnd('register', userName);
  } 
  if (el.target.innerText.toLowerCase() === 'logar' && el.target.tagName.toLowerCase() === 'button'){
    const userName = document.querySelector('#userName').value;
    console.log(userName)
    handleFrontEnd('login', userName);
  }
}

async function init() {
  document.addEventListener('click', getBtn);
  try {
    
    await manageLoggedUser();
    // initialize SPA
    await spaAppConfig();
    // load images 
    await loadImages();
    // clear inputs
    clearInputs();
    // controll contactbook application
    initContactBookApp();

  } catch(e) {
    console.log(e);
  }
}


window.onload = init;
window.onclose = () => { 
  window.localStorage.removeItem("loggedUser");
};
