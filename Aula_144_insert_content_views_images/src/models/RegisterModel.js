const mongoose = require('mongoose');
const fs = require('fs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
},
  {timestamp: true}
);

const User = mongoose.model('user', UserSchema);

function saveAdvice(data) {
  fs.writeFile('./src/models/db/advice.json', JSON.stringify(data), err => {
    if (err) {
      console.error(err);
    } else console.log('JSON data is saved.');
  });
}


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
    this.attrName = '';
    this.advice = '';
    this.valid = false;

    this.validarForm = ()=> {
      if (!this.validarNome()) return;
      if (!this.validarSobrenome()) return;
      if (!this.validarCpf()) return;
      if (!this.validarUsuario()) return;
      if (!this.validarSenha()) return;
      if (!this.validarRepSenha()) return;
      this.valid = true;
      this.advice = 'Cadastro efetuado com sucesso!';
    }
  
    this.validarNome = () => {
      if (this.name === ''){
        this.attrName = 'nome';
        this.advice = 'Informe nome do novo usuário.';
        saveAdvice({
          attrName: this.attrName,
          advice: this.advice,
        })
        return false;
      }
      return true;
    }
  
    this.validarSobrenome = () => {
      if (this.lastname === ''){
        this.attrName = 'sobrenome';
        this.advice = 'Informe sobrenome do novo usuário.';
        saveAdvice({
          attrName: this.attrName,
          advice: this.advice,
        })
        return false;
      } 
      return true;
    }

    this.validarCpf = () => {
      

      const cpfResultado = new ValidadorCPF(this.cpf);
      if (!cpfResultado.validarCPF()){
        this.attrName = 'cpf';
        this.advice = 'CPF inválido.';
        saveAdvice({
          attrName: this.attrName,
          advice: this.advice,
        })
        return false;
      }
      return true;
    }

    this.validarUsuario = () => {
      if (this.userName === ''){
        this.attrName = 'usuario';
        this.advice = 'Informe usuário.';
        saveAdvice({
          attrName: this.attrName,
          advice: this.advice,
        })
        return false;
      } 
      if (this.userName.length < 3 || this.userName.length > 12){
        this.attrName = 'usuario';
        this.advice = 'Usuário deverá ter entre 3 e 12 caracteres.';
        saveAdvice({
          attrName: this.attrName,
          advice: this.advice,
        })
        return false;
      } 
      if (!/^[A-Za-z0-9]*$/.test(this.userName)){
        this.attrName = 'usuario';
        this.advice = 'Usuário só poderá conter letras e/ou números.';
        saveAdvice({
          attrName: this.attrName,
          advice: this.advice,
        })
        return false;
      } 
      return true;
    }
  
    this.validarSenha = () => {
      if (this.password === ''){
        this.attrName = 'senha';
        this.advice = 'Informe senha.';
        saveAdvice({
          attrName: this.attrName,
          advice: this.advice,
        })
        return false;
      }
      if (this.password.length < 6 || this.password.length > 12){
        this.attrName = 'senha';
        this.advice = 'Senha deverá ter entre 6 e 12 caracteres.';
        saveAdvice({
          attrName: this.attrName,
          advice: this.advice,
        })
        return false;
      } 
      return true;
    }
  
    this.validarRepSenha = () => {
      if (this.repPassword === ''){
        this.attrName = 'repetirSenha';
        this.advice = 'Informe senha novamente.';
        saveAdvice({
          attrName: this.attrName,
          advice: this.advice,
        })
        return false;
      }
      if (this.password !== this.repPassword){
        this.attrName = 'repetirSenha';
        this.advice = 'Senhas não conferem.';
        saveAdvice({
          attrName: this.attrName,
          advice: this.advice,
        })
        return false;
      } 
      return true;
    }

    this.saveUserDB = async () => {
      this.validarForm();
      if (this.valid) {
        User.create({
          name: this.name,
          lastname: this.lastname,
          cpf: this.cpf,
          userName: this.userName,
          password: this.password,
        })
        .then((data) => {
          console.log(data);
          return true;
        })
        .catch(err => {
          if (err.code === 11000) {
            if ('cpf' in err.keyPattern){
              this.attrName = 'cpf';
              this.advice = 'CPF já consta no cadastro.';
              saveAdvice({
                attrName: this.attrName,
                advice: this.advice,
              })
              return false;
            }
            if ('userName' in err.keyPattern){
              this.attrName = 'usuario';
              this.advice = 'Usuário já consta no cadastro.';
              saveAdvice({
                attrName: this.attrName,
                advice: this.advice,
              })
              return false;
            }
          }
        });
      } else {
        return false;
      }
    }
  }
}

module.exports = {
  ValidateNewUser,
  User
}
  

