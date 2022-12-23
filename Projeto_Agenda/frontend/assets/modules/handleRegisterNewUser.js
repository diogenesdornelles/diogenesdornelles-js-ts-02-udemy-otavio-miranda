import ValidateCpf from "./ValidateCpf";
import validator from 'validator';

export default function handleRegisterNewUser(){
  
  const _name = document.querySelector('.register-painel #name');
  const surname = document.querySelector('.register-painel #surname');
  const email = document.querySelector('.register-painel #email');
  const phone = document.querySelector('.register-painel #phone');
  const birthday = document.querySelector('.register-painel #birthday');
  const cpf = document.querySelector('.register-painel #cpf');
  const userName = document.querySelector('.register-painel #userName');

  const arrayEls = [_name.checkValidity(), surname.checkValidity(), email.checkValidity(), phone.checkValidity(), birthday.checkValidity(), cpf.checkValidity(), userName.checkValidity()];
  if (arrayEls.includes(false)) return;

  const validatorCpf = new ValidateCpf(cpf.value);
  if (!validatorCpf.validate()) {
    alert('CPF inválido!');
    return;
  };
  const checkData = _name.value && surname.value && email.value && phone.value && birthday.value && userName.value;
  if (!checkData || phone.value !== 11 || !validator.isEmail(email.value)) {
    alert('Dados incorretos!');
    return;
  }
  document.querySelector('.register-painel .form').submit();
}