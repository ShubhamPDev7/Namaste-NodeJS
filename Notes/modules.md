# Node.js Modules

## Why modules?
Keeping everything in one file doesn't scale. Modules let us:
- Split code into smaller, focused files
- Reuse code across files
- Avoid naming conflicts

## Exporting and importing (CommonJS)
```js
// math.js
function add(a, b) {
  return a + b;
}
const PI = 3.14;

module.exports = { add, PI };
```
```js
// app.js
const math = require("./math");
console.log(math.add(2, 3)); // 5
```

## Destructuring with require()
```js
const { add, PI } = require("./math");
console.log(add(2, 3));
```

## Why can't one module see another's variables?
Each file is wrapped in its own function by Node, so everything declared in it is private to that function's scope. Only what you put on `module.exports` is visible to others. (See the `require()` notes for the wrapper.)

```js
// secret.js
const hidden = "you can't see me";
module.exports = { visible: "you can see me" };
```
`hidden` can't be reached from another file.

## module.exports vs exports
`exports` is just a shortcut pointing at `module.exports`.

```js
exports.add = add;          // works
module.exports = { add };   // works

exports = { add };          // DOES NOT work, only reassigns the local variable
```
What `require()` finally returns is always `module.exports`.