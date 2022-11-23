const mongoose = require('mongoose');
//const clearInputs = require('../../frontend/index')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  cpf: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
},
  {timestamp: true}
);

const NewUser = mongoose.model('user', UserSchema);

class ValidadorCPF {
  constructor(cpf){
    this.arrayCpf = cpf.replace(/\D+/g, '').split('');
    this.firstDigito = false;
    this.secondDigito = false;
  }

  validarCPF(){
    if (typeof this.arrayCpf === 'undefined') return false;
    if (this.arrayCpf.length !== 11) return false;
    if (this.isSequencia()) return false;
    this.firstDigito = this.verificaDigitos(9);
    this.secondDigito = this.verificaDigitos(10);
    const resultado = this.resultado();
    return resultado;
  }

  verificaDigitos(posicao){
    let cont = posicao + 1;
    const resultado = this.arrayCpf.slice(0, posicao).reduce((acc, current) => {
      acc += Number(current) * cont;
      cont--;
      return acc;
    }, 0);

    if ((resultado * 10) % 11 === Number(this.arrayCpf[posicao])) {
      return true;
    } false;
  }

  resultado(){
    return this.firstDigito && this.secondDigito ? true : false;
  } 

  isSequencia = function(){
    let cpfLimpo = this.arrayCpf.join("");
    return (cpfLimpo[0].repeat(cpfLimpo.length) === cpfLimpo);
  }
}

class ValidateNewUser {
  constructor (name, lastname, cpf, userName, password, repPassword ){
    this.name = name;
    this.lastname = lastname;
    this.cpf = cpf;
    this.userName = userName;
    this.password = password;
    this.repPassword = repPassword;
    this.valid = false;

    this.validarForm = ()=> {
      if (!this.validarNome()) return;
      if (!this.validarSobrenome()) return;
      if (!this.validarCpf()) return;
      if (!this.validarUsuario()) return;
      if (!this.validarSenha()) return;
      if (!this.validarRepSenha()) return;
      this.valid = true;
      // callAlert('Cadastro efetuado com sucesso!');
      // clearInputs();
    }
  
    this.validarNome = () => {
      if (this.name === ''){
        //callAlert('Informe nome do novo usuário.');
        return false;
      }
      return true;
    }
  
    this.validarSobrenome = () => {
      if (this.lastname === ''){
        //callAlert('Informe sobrenome do novo usuário.');
        return false;
      } 
      return true;
    }

    this.validarCpf = () => {
      const cpfResultado = new ValidadorCPF(this.cpf);
      if (!cpfResultado.validarCPF()){
        //callAlert('CPF inválido.');
        return false;
      }
      return true;
    }

    this.validarUsuario = () => {
      if (this.userName === ''){
        //callAlert('Informe usuario.');
        return false;
      } 
      if (this.userName.length < 3 || this.userName.length > 12){
        //callAlert('Usuário deverá ter entre 3 e 12 caracteres.');
        return false;
      } 
      if (!/^[A-Za-z0-9]*$/.test(this.userName)){
        //callAlert('Usuário só poderá conter letras e/ou números.');
        return false;
      } 
      return true;
    }
  
    this.validarSenha = () => {
      if (this.password === ''){
        //callAlert('Informe senha.');
        return false;
      }
      if (this.password.length < 6 || this.password.length > 12){
        //callAlert('Senha deverá ter entre 6 e 12 caracteres.');
        return false;
      } 
      return true;
    }
  
    this.validarRepSenha = () => {
      if (this.repPassword === ''){
        //callAlert('Informe senha novamente.');
        return false;
      }
      if (this.password !== this.repPassword){
        //callAlert('Senhas não conferem.');
        return false;
      } 
      return true;
    }

    this.saveUserDB = async () => {
      this.validarForm()
      if (this.valid) {
        NewUser.create({
          name: this.name,
          lastname: this.lastname,
          cpf: this.cpf,
          userName: this.userName,
          password: this.password,
        })
        .then((data) => {
          console.log(data);
        })
        .catch(err => console.log(err));
      } 
      return this.valid;
    }
  }
}





module.exports = ValidateNewUser;
