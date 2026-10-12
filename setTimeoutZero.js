console.log("Hello World");

var a = 1245667;
var b = 20456;

setTimeout(() => {
  console.log("Call me ASAP");
}, 0);

function multiplyFn(x, y) {
  const result = a * b;
  return result;
}

var c = multiplyFn(a, b);

console.log("Multiplication result is : ", c);
