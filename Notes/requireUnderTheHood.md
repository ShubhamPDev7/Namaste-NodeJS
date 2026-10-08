# What Happens When You Call require()

`require()` looks simple, but there are several steps behind it:

1. **Resolving**: find out which file is being asked for
2. **Loading**: read the file contents
3. **Wrapping**: wrap the code in a function
4. **Evaluating**: run the code
5. **Caching**: store the result for next time

## 1. Module resolution
For `require("something")`, Node decides what it is, roughly in this order:
- Core module (`fs`, `path`, `http`, ...)
- Relative or absolute path (`./file`, `../file`), trying extensions like `.js`, `.json`, `.node`
- Otherwise look inside `node_modules` folders, walking up the directory tree

The result is the absolute path of the file.

## 2. Loading
Node reads the file's contents based on its type (.js, .json, .node).

## 3. Wrapping (the IIFE)
Before running, Node wraps your code in a function, roughly like this:

```js
(function (exports, require, module, __filename, __dirname) {
  // your file's code goes here
});
```

This explains a lot:
- Why variables in a file are private (they're local to this function)
- Where `require`, `module`, `exports`, `__filename` and `__dirname` come from. They're just function parameters, not real globals.

## 4. Evaluation
The wrapped function is called, your code runs, and whatever you assign to `module.exports` becomes the return value of `require()`.

## 5. Caching
After the first load, the module is stored in `require.cache`, keyed by its resolved filename.

```js
// counter.js
console.log("counter.js is running");
module.exports = { count: 0 };
```
```js
const a = require("./counter"); // prints "counter.js is running"
const b = require("./counter"); // prints nothing, comes from cache

console.log(a === b); // true, same object
```

Because of the cache:
- A module's code only runs once
- Every file that requires it gets the same object, so state is shared
- Circular dependencies don't loop forever (but you may get a partially-filled `module.exports`)

## Where to look in the Node.js source
The CommonJS loader lives in the Node repo around `lib/internal/modules/cjs/loader.js`. Search for `Module._load`, `Module._resolveFilename` and `Module.prototype._compile`.

## Takeaway
Don't just learn how to use a tool. Understand what's happening behind the scenes.