export default function CriaGeradorCPF() {

  this.listaNumerosCPF = [];
  this.buttonGerar = document.querySelector('#gerar-cpf');
  this.pResultado = document.querySelector('.result-gerar p');
  this.buttonCopy = document.querySelector('#btn-copiar');
  this.cont = 10;
  this.acc = 0;
  this.result = '';
  this.firstVerificador = '';
  this.secondVerificador = '';
  
  this.initialize  = () => {
    this.addEvents();
  };

  this.addEvents  = () =>  {
    this.buttonGerar.addEventListener('click', this.addVerificadoresCpf.bind(this));
    this.buttonCopy.addEventListener('click', this.copyText);
  };

  this.fillListaNumeros  = () => {
    for (let i = 0; i < 9; i++){
      this.listaNumerosCPF.push(this.generateRandomIntegerInRangeZeroNove()); 
    }
  };

  this.generateRandomIntegerInRangeZeroNove  = () =>  {
    const carac = Math.floor(Math.random() * 10);
    return carac;
  };

  this.geraDigito = function (){
    let soma = this.listaNumerosCPF.reduce((acc, val) => {
        acc += val * this.cont;
        this.cont--;
        return acc;
      }, 0);
    if (((soma * 10) % 11) >= 10){
      return 0;
    } else return (soma * 10) % 11;
  }

  this.addVerificadoresCpf  = () => { 
    this.fillListaNumeros();
    this.cont = 10;
    this.acc = 0;
    this.firstVerificador = this.geraDigito();
    this.listaNumerosCPF.push(this.firstVerificador);
    this.cont = 11;
    this.acc = 0;
    this.secondVerificador = this.geraDigito();
    this.listaNumerosCPF.push(this.secondVerificador);
    this.formatResult();
  }

  this.formatResult = () =>  {
    this.listaNumerosCPF.splice(3, 0, '.');
    this.listaNumerosCPF.splice(7, 0, '.');
    this.listaNumerosCPF.splice(11, 0, '-');
    this.result = this.listaNumerosCPF.join('');
    this.renderResult();
  }

  this.renderResult = () => {
    this.pResultado.style.backgroundColor = '#4cb050';
    this.pResultado.innerHTML = this.result;
    this.clearSettings();
  }

  this.clearSettings  = () =>  {
    this.listaNumerosCPF = [];
    this.result = '';
    this.firstVerificador = '';
    this.secondVerificador = '';
  }
  
  this.copyText  = () =>  {
    const copyText = document.querySelector('.result-gerar p').innerHTML;
    navigator.clipboard.writeText(copyText);
    alert("CPF copiado: " + copyText);
  }
}