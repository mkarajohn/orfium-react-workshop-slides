export const normalFunction = `function someFun() {
  return 1;
}`;

export const normalFunction2 = `function someFun() {
  return 1;
}

someFun();`;

export const anonymousFunction = `doSomething().onSuccess(function() {
  return 1;
});`;

export const fatArrowFunction = `const someFun = () => {
  return 1;
};`;

export const fatArrowFunction2 = `const someFun = () => {
  return 1;
};

someFun();`;

export const fatArrowFunctionShort = `const someFun = () => 1;

someFun();`;

export const fatArrowFunction3 = `doSomething().onSuccess(() => {
  return 1;
});`;

export const objectDest1 = `const person = {
  name: 'Dwight',
  surname: 'Schrute',
  role: 'Assistant to the regional manager',
};

const name = person.name;
const surname = person.surname;
const role = person.role;`;

export const objectDest2 = `const person = {
  name: 'Dwight',
  surname: 'Schrute',
  role: 'Assistant to the regional manager',
};

const { name, surname, role } = person;`;

export const objectDest3 = `const person = {
  name: 'Dwight',
  surname: 'Schrute',
  role: 'Assistant to the regional manager',
};

const { name, ...rest } = person;

// rest === { 
//   surname: 'Schrute', 
//   role: 'Assistant to the regional manager'
// }`;

export const objectSpread = `const person = {
  name: 'Dwight',
  surname: 'Schrute',
  role: 'Assistant to the regional manager',
};

const betterPerson = { 
  ...person, 
  role: 'Assistant regional manager' 
};

// betterPerson === { 
//   name: 'Dwight', 
//   surname: 'Schrute', 
//   role: 'Assistant regional manager'
// }`;

export const arrayDest1 = `const sales = ['Dwight', 'Jim', 'Phyllis'];

const first = sales[0];
const second = sales[1];
const third = sales[2];`;

export const arrayDest2 = `const sales = ['Dwight', 'Jim', 'Phyllis'];

const [first, second, third] = sales;`;

export const arrayDest3 = `const sales = ['Dwight', 'Jim', 'Phyllis'];

const [first, ...rest] = sales;

// rest === ['Jim', 'Phyllis']`;

export const arraySpread = `const sales = ['Dwight', 'Jim', 'Phyllis'];

const moreSales = [...sales, 'Stanley'];

// moreSales === ['Dwight', 'Jim', 'Phyllis', 'Stanley']`;

export const tern1 = `if (cond === true) {
  console.log('a');
} else {
  console.log('b');
}`;

export const tern2 = `(cond === true) ? console.log('a') : console.log('b');`;

export const arrayMap = `const arr = [1, 2, 3, 4, 5];

const doubleArr = arr.map(function (num) {
  return num * 2;
});

// doubleArr === [2, 4, 6, 8, 10]`;

export const promise1 = `const response = Promise(...);

response
  .then(function(value) {
    console.log(value)
  })
  .catch(function(err) {
    console.log(err);
    throw err
  })`;

export const promise2 = `const response = Promise(...);

console.log('a');

response.then(function() {
  console.log('b');
})

console.log('c');`;

export const promise3 = `const response = Promise(...);

console.log('a');

response.then(function() {
  console.log('b');
})

console.log('c');`;

export const switchStatement = `switch(value) {
  case 1:
    // do something
    break;
  case 2:
    // do something else
    break;
  default:
    // do default thing
}`;
