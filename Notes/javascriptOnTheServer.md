# JavaScript on the Server

## What is a server?
A server is just a computer (or a program running on one) that listens for requests and sends back responses. A browser asks for something, the server handles it and replies.

## How does JavaScript run outside the browser?
JavaScript was originally built to run only inside browsers. Node.js changed that by taking an existing JavaScript engine and wrapping it in a program that can run on its own, on any machine.

Node.js is a **runtime**, not a language. It gives JavaScript things the browser never had:
- File system access
- Networking (create servers, make requests)
- Access to the operating system

## Node.js and V8
- **V8** is the JavaScript engine made by Google (it's what runs JS in Chrome). It is written in C++.
- Node.js embeds V8 to execute JavaScript.
- Node.js itself adds the extra pieces around V8, such as the APIs for files and networking, and libuv for async I/O and the event loop.

## How V8 runs JavaScript
Roughly:
1. Parse the source code into an AST (abstract syntax tree)
2. Compile it into bytecode and start running it (interpreter)
3. Frequently-run ("hot") code gets optimized and compiled into machine code (JIT compilation)

So JavaScript isn't purely "interpreted". It's compiled to machine-level instructions while it runs.

## Key takeaway
Node.js = V8 (runs the JS) + extra APIs and libuv (talks to the outside world).