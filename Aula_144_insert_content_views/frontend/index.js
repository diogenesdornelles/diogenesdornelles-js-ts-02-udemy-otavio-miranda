import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/styleHome.css';
import './assets/css/reset.css';
import imgUrl from './assets/images/background.png';
// frontend


const app = () => {
  const container = document.createElement('div');
  const codeImage = document.createElement('img');
  container.appendChild(codeImage);
  codeImage.src = imgUrl;
  return container;
}

const el = app()

document.body.appendChild(el)
