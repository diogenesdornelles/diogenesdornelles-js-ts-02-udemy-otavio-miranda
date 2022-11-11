const letterLower = 'abcdefghijklmnopqrstuvxwyz';
const letterUpper = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ'
const numbers = '0123456789';
const symbols =  "!@#$%^&*";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class PassGenerator{
  
  constructor(amountCharac, addNumbers = false, addUpper = false, addLower = false, addSymbols = false){
    
    this.amountCharac = amountCharac || 8;
    this.options = {
      addNumbers: addNumbers,
      addUpper: addUpper,
      addLower: addLower,
      addSymbols: addSymbols,
    }
    this.charSelected = '';
    this.result = '';
    
    this.getPass = () => {
      if (Object.values(this.options).includes(true)) {
        if (this.options.addNumbers){
          this.charSelected += numbers;
        }
        if (this.options.addUpper){
          this.charSelected += letterUpper;
        }
        if (this.options.addLower){
          this.charSelected += letterLower;
        }
        if (this.options.addSymbols){
          this.charSelected += symbols;
        }
        for (let i = 0; i < Number(this.amountCharac); i++){
          this.result += this.charSelected[getRandomInt(0, this.charSelected.length - 1)]
        }
        return this.result;
      } else alert('Esolha ao menos uma opção.')
    } 
  }
  

}
//`~!@#$%^&*()_-+={[}]|:;"'<,>.?/`
