export default function CriaValidadorCPF() {

  this.inputValidar = '';
  this.buttonValidar = document.querySelector('#btn-submit-cpf');
  this.buttonLimpar = document.querySelector('#btn-limpar');
  this.pResultado = document.querySelector('.result-validar p');
  this.firstDigitoCheck = false;
  this.secondDigitoCheck = false;

  this.initialize  = () => this.addEvents(); 

  this.addEvents = () => {
    this.buttonValidar.addEventListener('click', this.getCPF);
    this.buttonLimpar.addEventListener('click', this.clearHtml);
  } 

  this.getCPF = () => {
    this.inputValidar = document.querySelector('#validar-cpf').value.replace(/\D+/g, '');
    if (typeof this.inputValidar !== 'undefined' && this.inputValidar.length === 11 && !this.isSequence()) {
      this.validarCPFDigitos();
    } else alert('Informe CPF corretamente.');
  }

  this.isSequence = () => {
    return (this.inputValidar[0].repeat(this.inputValidar.length) === this.inputValidar);
  }
  
  this.verificar = function (posicao) {
    let acc = 0;
    for (let i = 0; i < posicao; i++) {
      acc += Number(this.inputValidar[i]) * this.cont;
      this.cont--;
    }
    if (acc * 10 % 11  === Number(this.inputValidar[posicao])) {
      return true;
    }
  }
  
  this.validarCPFDigitos = () => {
    this.cont = 10;
    const posicaoPrimeiroDigito = this.cont - 1;
    this.firstDigitoCheck = this.verificar(posicaoPrimeiroDigito)
    this.cont = 11;
    const posicaoSegundoDigito = this.cont - 1;
    this.secondDigitoCheck = this.verificar(posicaoSegundoDigito)
    this.checarDigitos();
  }

  this.checarDigitos = () => {
    if (this.firstDigitoCheck && this.secondDigitoCheck) {
      this.addHtmlValido();
    } else this.addHtmlInvalido();
  }

  this.addHtmlValido = () => {
    this.pResultado.innerHTML = 'CPF VÁLIDO';
    this.pResultado.style.backgroundColor = '#4cb050';
    this.turnCheckFalse();
  }

  this.addHtmlInvalido = () => {
    this.pResultado.innerHTML = 'CPF INVÁLIDO';
    this.pResultado.style.backgroundColor = 'red';
  }

  this.turnCheckFalse = () => {
    this.firstCheck = false;
    this.secondCheck = false;
  }

  this.clearHtml= () => {
    this.pResultado.innerHTML = '';
    document.querySelector('#validar-cpf').value = '';
    this.pResultado.style.backgroundColor = 'white';
  }
}