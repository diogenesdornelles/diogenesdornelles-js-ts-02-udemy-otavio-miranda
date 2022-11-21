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
import './assets/css/reset.css';
import imgUrl from './assets/images/background.png';
// frontend

const app = () => {
  //const container = document.createElement('div');
  const codeImage = document.createElement('img');
  codeImage.setAttribute('class', 'bg-home')
  //container.appendChild(codeImage);
  codeImage.src = imgUrl;
  return codeImage;
}

const el = app()

document.body.appendChild(el)
