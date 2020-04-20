const myLib = require('./myLib');
const myPlugin = require('./myPlugin');

myLib.use([ myPlugin ], false);

myLib.testF();

console.log(myLib.test);

console.log(myLib.testS);

console.log(myLib.testA);
