import { person as ps, soma, Person, person2 } from './module1';

import menos from './module1'; // importa default module

// import * as myModule from './module1'; importa all, como python

console.log(ps, person2);

const num = soma(2, 3)
console.log(num);

const min = menos(8, 5)
console.log(min);

const p1 = new Person('Elis', 42);
console.log(p1);
