export default function clearInputs(){
  const inputs = document.querySelectorAll('INPUT');
  inputs.forEach(element => element.value = '');
}