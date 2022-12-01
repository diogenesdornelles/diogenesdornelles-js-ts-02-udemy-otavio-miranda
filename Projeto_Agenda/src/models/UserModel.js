const mongoose = require('mongoose');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

class ValidateCpf {
  constructor(cpf){
    this.arrayCpf = cpf.replace(/\D+/g, '').split('');
    this.firstDigit = false;
    this.secondDigit = false;
  }

  validate(){
    if (typeof this.arrayCpf === 'undefined') return false;
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

function checkCpf(value) {
  const cpfResultado = new ValidateCpf(value);
  if (!cpfResultado.validate()) return false;
  return true;
}


const UserSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, "No need a name?"],
    trim: true,
    validate: {
      values: /^[ A-Za-z]+$/, 
      message: "Name user must have only letters or spaces."
    }
  },
  surname: { 
    type: String,
    required: [true, "No need a surname?"],
    trim: true,
    validate: {
      values: /^[ A-Za-z]+$/, 
      message: "Surname user must have only letters or spaces."
    }
  },
  birthday: {
    type: Date,
    required: [true, "No have birthday?"],
  },
  email: { 
    type: String,
    lowercase: true,
    required: [true, "Need a e-mail address."],
    trim: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },
  gender: {
    required: true,
    enum: ["male", "female"],
    lowercase: true,
    trim: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: checkCpf,
      message: props => `${props.value} is not a valid CPF number!`
    },
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  repPassword: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function () {
        if (this.password !== this.repPassword) {
          return false;
        }
      },
      message: props => `Passwords do not match!`
    },
  },

}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;