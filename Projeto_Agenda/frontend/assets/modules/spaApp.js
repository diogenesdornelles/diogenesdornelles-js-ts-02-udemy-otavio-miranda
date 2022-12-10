export default async function spaAppConfig() {

  async function getUserIdLocalStorage(){
    const user = JSON.parse(window.localStorage.getItem("loggedUser")); 
    return user._idUser;
  }

  document.addEventListener('click', (e) => {
    const { target } = e;
    if (!target.matches("nav a")){
      return;
    }
    e.preventDefault();
    urlRoute();
  })

  const _idUser = await getUserIdLocalStorage();
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
      param: "initial",
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
    urlLocationHandler();
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