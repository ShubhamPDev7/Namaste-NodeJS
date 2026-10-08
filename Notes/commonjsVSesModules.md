# CommonJS vs ES Modules

Node.js supports two module systems.

## CommonJS (CJS)
The original Node.js system.
```js
const fs = require("fs");
module.exports = { something };
```

## ES Modules (ESM)
The official JavaScript standard (same as in browsers).
```js
import fs from "fs";
export const something = 1;
export default function main() {}
```

## How to use ESM in Node
Either:
- Set `"type": "module"` in `package.json`, or
- Use the `.mjs` file extension

## Differences

| | CommonJS | ES Modules |
|---|---|---|
| Syntax | `require` / `module.exports` | `import` / `export` |
| Loading | Synchronous | Asynchronous |
| When imports are resolved | At runtime, when `require()` is called | Analyzed statically before the code runs |
| Strict mode | Not by default (sloppy mode) | Always strict mode |
| Top-level `await` | No | Yes |
| `__dirname`, `__filename` | Available | Not available (use `import.meta.url`) |
| `require()` inside conditions | Yes | No, `import` must be at top level (use `import()` for dynamic) |

## Takeaway
New code generally goes with ESM since it's the standard. CommonJS is still everywhere in existing packages, so you need to know both.