import createNewPassObj from "./createNewPassObj"

export default function getDataFieldsFromForm(){
  const amountChar = document.querySelector('#amt-charac').value;
  const itMightHaveNumbers = document.querySelector('#addnumber').checked;
  const itMightHaveUpper = document.querySelector('#adduppercase').checked;
  const itMightHaveLower = document.querySelector('#addlowercase').checked;
  const itMightHaveSymbol = document.querySelector('#addsymbol').checked;
  createNewPassObj(amountChar, itMightHaveNumbers, itMightHaveUpper, itMightHaveLower, itMightHaveSymbol)
}