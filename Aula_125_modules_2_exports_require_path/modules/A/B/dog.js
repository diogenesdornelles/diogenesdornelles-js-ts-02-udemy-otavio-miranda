module.exports = class Dog{
  constructor(_name){
    this._name = _name;
    this.bark = () => {
      console.log(`${this._name} is barking!`);
    }
  }
}