import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/styleHome.css';
import './assets/css/styleContact.css';
import './assets/css/styleAbout.css';
import './assets/css/styleProducts.css';
import './assets/css/styleNetwork.css';
import './assets/css/styleLogin.css';
import './assets/css/styleHeader.css';
import './assets/css/styleBody.css';
import './assets/css/styleFooter.css';
import './assets/css/styleFormSended.css';
import './assets/css/styleComments.css';
import './assets/css/styleRegister.css';
import './assets/css/reset.css';
import imgUrl from './assets/images/background.png';

// set images
const app = () => {
  //const container = document.createElement('div');
  const codeImage = document.createElement('img');
  codeImage.setAttribute('class', 'bg-home')
  //container.appendChild(codeImage);
  codeImage.src = imgUrl;
  return codeImage;
}

const el = app()
const body = document.querySelector('BODY');

body.appendChild(el)

function clearAdvices(){
  const p = document.querySelectorAll('.p-advice');
  p.forEach((element) => {
    element.remove();
  });
}

document.addEventListener('click', getBtn);


function getBtn(el) {
  if (el.target.innerText === 'REGISTRAR'){
    insertAdviceError('.register', '/advice')
  } 
  if (el.target.innerText === 'LOGAR'){
    insertAdviceError('.login', '/advice/login')
  }
}

function insertAdviceError(_class, url) {

  setTimeout(() => {
    axios(`http://localhost:3000/api` + `${url}`)
      .then(response => {
        clearAdvices()
        const element = document.querySelector(`${_class} [name="${response.data.attrName}"]`);
        if (element.parentNode.childElementCount === 1){
          const p = document.createElement('p');
          p.setAttribute('class', 'p-advice');
          p.innerText = response.data.advice;
          element.insertAdjacentElement('afterend', p);
        } else return;
      })
      .catch(error => console.log(error))
  }, 50)
}


// window.addEventListener('load', insertUser);

// function insertUser() {
//   const element = document.querySelector(`.header ul`);
//   const firstChild = element.querySelector(`:first-child`);
//   if (firstChild.childElementCount === 1) {
//     setTimeout(() => {
//       axios(`http://localhost:3000/api/user/logged`)
//         .then(response => {
//           const user = document.querySelector('.login #usuario').value;
//           if (user === response.data.userName) {
//             const li = document.createElement('li');
//             li.setAttribute('class', 'li-user');
//             li.innerText = `Bem-vindo: ${response.data.userName}`;
//             element.prepend(li);
//           } else return;
//         })
//         .catch(error => console.log(error))
//     }, 50)
//   }
// }



