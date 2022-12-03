import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/styleHome.css';
import './assets/css/styleHeader.css';
import './assets/css/styleLogin.css';
import './assets/css/styleRegister.css';
import './assets/css/reset.css';
import 'regenerator-runtime';
// frontend

async function manageLoggedUser(){
  let user;
  const el = document.querySelector('.header nav ul');
  console.log(el.childElementCount)
  if (el.childElementCount > 4) {
    const _idUser = el.querySelector('.logged-user').getAttribute("_idUser");  
    const nameUser = el.querySelector('.logged-user').getAttribute("nameUser"); 
    user = {
      logged: true,
      _idUser: _idUser,
      nameUser: nameUser
    }
  } else {
    user = {
      logged: false,
      _idUser: '',
      nameUser: ''
    }
  }
  window.localStorage.setItem("loggedUser", JSON.stringify(user)); 
  return;
}

async function getUserId(){
  const user = JSON.parse(window.localStorage.getItem("loggedUser")); 
  return user._idUser;
}

async function spaAppConfig() {
  document.addEventListener('click', (e) => {
    const { target } = e;
    if (!target.matches("nav a")){
      return;
    }
    e.preventDefault();
    urlRoute();
  })

  const _idUser = await getUserId();
  // routes config path
  const urlRoutes = {
    404: {
      template: "/404",
      title: "",
      description: "",
      param: "",
      _idUser: '',
    },
    "/": {
      template: "/",
      title: "",
      description: "",
      param: "",
      _idUser: '',
    },
    "/home": {
      template: "/home",
      title: "",
      description: "",
      param: "homePage",
      _idUser: '',
    },
    "/entrar": {
      template: "/entrar",
      title: "",
      description: "",
      param: "/loginPage",
      _idUser: '',
    },
    "/registrar": {
      template: "/registrar",
      title: "",
      description: "",
      param: "registerPage",
      _idUser: '',
    },
    "/agenda": {
      template: "/agenda/",
      title: "",
      description: "",
      param: "contactBookPage/",
      _idUser: _idUser,
    },
  }

  const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({},
      "",
      event.target.href
    );
    urlLocationHandler()
  }

  const urlLocationHandler = () => {
    const location = window.location.pathname;
    if (location.length === 0) {
      location = "/";
    }
    const route = urlRoutes[location] || urlRoutes[404];
    axios.get(route.template + route.param + route._idUser)
    .then(response => {
      document.querySelector('.index .container').innerHTML = response.data;
    })
    .catch(error => console.log(error))
  }
}

async function loadCsrf() {
  const csrfToken = document.querySelector('#csrfToken');
  const inputsHidden = document.querySelectorAll('input[name="_csrf"]');
  inputsHidden.forEach((el) => {el.value = csrfToken.innerText});
}

async function init() {

  // initialize localStorage
  await manageLoggedUser();

  // initialize SPA
  await spaAppConfig();

  // load csrfToken on hidden inputs
  await loadCsrf();

  // clear inputs
  if (document.querySelector("FORM")) {
    const inputs = document.querySelectorAll("INPUT");
    inputs.forEach((el) => {
      el.value = "";
    })
  }
}

document.addEventListener('click', getBtn);

function getBtn(el) {
  if (el.target.innerText.toLowerCase() === 'registrar' && el.target.tagName.toLowerCase() === 'button'){
    getAlertError('/advice/register')
  } 
  if (el.target.innerText.toLowerCase() === 'logar' && el.target.tagName.toLowerCase() === 'button'){
    getAlertError('/advice/login')
  }
}

function getAlertError(url) {
  setTimeout(() => {
    axios(`http://localhost:3000/api` + `${url}`)
      .then(response => {
        let text = '';
        for (const key in response.data){
          if (response.data[key]) {
            text += response.data[key] + '\n'
          }
        }
        alert(text);
      })
      .catch(error => console.log(error))
  }, 50)
}

window.onload = init;
