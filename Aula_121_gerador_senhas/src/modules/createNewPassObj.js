import PassGenerator from './passGenerator'
import renderResult from './renderHTML'

export default function createNewPassObj(amountChar, itMightHaveNumbers, itMightHaveUpper, itMightHaveLower, itMightHaveSymbol){
  const newPass = new PassGenerator(amountChar, itMightHaveNumbers, itMightHaveUpper, itMightHaveLower, itMightHaveSymbol)
  const result = newPass.getPass()
  renderResult(result)
}
