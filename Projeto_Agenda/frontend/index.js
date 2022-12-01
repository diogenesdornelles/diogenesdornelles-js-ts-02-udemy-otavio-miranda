import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/styleHome.css';
import './assets/css/styleHeader.css';
import './assets/css/styleLogin.css';
import './assets/css/styleRegister.css';
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

function spaAppConfig() {
  document.addEventListener('click', (e) => {
    const { target } = e;
    if (!target.matches("nav a")){
      return;
    }
    e.preventDefault();
    urlRoute();
  })

  // routes config path
  const urlRoutes = {
    404: {
      template: "/404",
      title: "",
      description: "",
      param: "",
    },
    "/": {
      template: "/",
      title: "",
      description: "",
      param: "",
    },
    "/home": {
      template: "/home",
      title: "",
      description: "",
      param: "nomePage",
    },
    "/entrar": {
      template: "/entrar",
      title: "",
      description: "",
      param: "/loginPage",
    },
    "/registrar": {
      template: "/registrar",
      title: "",
      description: "",
      param: "registerPage",
    },
    "/agenda": {
      template: "/agenda",
      title: "",
      description: "",
      param: "contactBookPage",
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
    axios.get(route.template + route.param)
    .then(response => {
      document.querySelector('.index .container').innerHTML = response.data;
    })
    .catch(error => console.log(error))
  }
}

window.onload = init;
spaAppConfig();
