import imgHome from '../images/casa.png';
import imgLogin from '../images/login-icon.png';
import imgContactBook from '../images/agenda.png';
import imgRegister from '../images/register.png';

let images = {
  home: imgHome,
  login: imgLogin,
  contactbook: imgContactBook,
  register: imgRegister
};

const li = document.querySelectorAll('.header .link-menu');

export default async function loadImages() {
  const app = (image) => {
    const codeImage = document.createElement('img');
    codeImage.src = image;
    return codeImage;
  }

  for (const key in images){
    const el = app(images[key]);
    const li = document.querySelector(`.header .image-${key}`);
    li.appendChild(el);
  }
}
