const crypto = require("node:crypto");

console.log("Hello World");

var a = 124566;
var b = 23456;

// pbkdf2 = Password Base Key Derivative function

crypto.pbkdf2Sync("password", "salt", 50000, 50, "sha512");
console.log("First Key is Generated");

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err, key) => {
  console.log("Key is generated");
});

function multiplyFn(x, y) {
  const result = a * b;

  return result;
}

var c = multiplyFn(a, b);
console.log("Multiplication result is : ", c);
