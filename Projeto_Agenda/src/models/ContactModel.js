const mongoose = require('mongoose');

class ValidateCpf {
  constructor(cpf){
    this.arrayCpf = cpf.replace(/\D+/g, '').split('');
    this.firstDigit = false;
    this.secondDigit = false;
  }

  validate(){
    if (typeof this.arrayCpf === undefined) return false;
    if (this.arrayCpf.length !== 11) return false;
    if (this.isSequence()) return false;
    this.firstDigit = this.verifyDigits(9);
    this.secondDigit = this.verifyDigits(10);
    const result = this.result();
    return result;
  }

  verifyDigits(position){
    let cont = position + 1;
    const result = this.arrayCpf.slice(0, position).reduce((acc, current) => {
      acc += Number(current) * cont;
      cont--;
      return acc;
    }, 0);

    if ((result * 10) % 11 === Number(this.arrayCpf[position])) {
      return true;
    } false;
  }

  result(){
    return this.firstDigit && this.secondDigit ? true : false;
  } 

  isSequence = function(){
    let cpfClear = this.arrayCpf.join("");
    return (cpfClear[0].repeat(cpfClear.length) === cpfClear);
  }
}

const ContactSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, "No need a name?"],
    trim: true,
    validate: {
      validator: function(value) {
        return /^[ A-Za-zÀ-ú]+$/.test(value);
      },
      message: props => `${props.value} is not a valid name!`
    },
  },
  surname: { 
    type: String,
    required: [true, "No need a surname?"],
    trim: true,
    validate: {
      validator: function(value) {
        return /^[ A-Za-zÀ-ú]+$/.test(value);
      },
      message: props => `${props.value} is not a valid name!`
    },
  },
  email: { 
    type: String,
    lowercase: true,
    required: [true, "Need a e-mail address."],
    trim: true,
    validate: function (value) {
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(value);
    },
    message: props => `${props.value} is not a valid e-mail!`
  },
  phone: { 
    type: String,
    required: [true, "No need a phone?"],
    trim: true,
    validate: {
      validator: function(value) {
        return /^[ 0-9]+$/.test(value);
      },
      message: props => `${props.value} is not a valid phone!`
    },
  },
  
  birthday: {
    type: Date,
    trim: true,
    required: [true, "No have birthday?"],
  },
  gender: {
    type: String,
  },
  cpf: {
    type: String,
    trim: true,
    required: true,
    unique: [true, "CPF already registered"],
    validate: function (value){
      const cpfResultado = new ValidateCpf(value);
      if (!cpfResultado.validate()) return false;
      return true;
      },
      message: props => `${props.value} is not a valid CPF number!`
  }
}, {timestamps: true});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = {
  Contact
}