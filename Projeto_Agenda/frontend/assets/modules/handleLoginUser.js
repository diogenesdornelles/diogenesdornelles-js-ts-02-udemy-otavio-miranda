export default function handleLoginUser(){
  const user = document.querySelector('.login-painel #userName').value;
  const arrayEls = [user.checkValidity()];
  if (arrayEls.includes(false)) return;
  if (user.length < 3) return;
  else document.querySelector('.login-painel .form-login').submit();
}