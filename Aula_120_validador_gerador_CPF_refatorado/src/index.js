import './assets/css/reset.css'
import './assets/css/style.css'
import CriaGeradorCPF from './modules/CriaGeradorCPF'
import CriaValidadorCPF from './modules/CriaValidadorCPF'
import preventSubmitForm from './modules/preventSubmit'

preventSubmitForm();

const validador = new CriaValidadorCPF();
validador.initialize();

const gerador = new CriaGeradorCPF();
gerador.initialize();