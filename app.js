// const { x, calculateSum } = require("./calculate/sum");
// const { calculatemultiply } = require("./calculate/multiply");

const util = require("node:util");

const { calculateSum, calculatemultiply } = require("./calculate");

const data = require("./data.json");

console.log(data);

console.log(1 + 3);

var a = 22;
var b = 44;

z = "Hello NodeJs";
console.log(z);

calculateSum(a, b);
// console.log(x);

calculatemultiply(a, b);
// console.log(obj.x);
