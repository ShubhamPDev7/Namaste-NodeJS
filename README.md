# Node.js Learning Journey

I've been building APIs for a while, but I never really understood what was happening underneath. This repo is where I'm fixing that.

I'm learning Node.js properly: not just how to use it, but how it works. These are my notes, written in my own words as I go, and I'm sharing them in public so I stay consistent.

## Why this repo
- To understand Node.js instead of treating it as a black box
- To keep my notes in one place, organized by topic
- To learn in public and be accountable

## Progress

### Done
- [x] [JavaScript on the Server](./01-javascript-on-the-server.md): what a server is, Node.js and the V8 engine
- [x] [Getting Hands-on with Node.js](./02-getting-hands-on.md): installing, REPL, running files, global objects
- [x] [Node.js Modules](./03-modules.md): `require()`, `module.exports`, destructuring
- [x] [CommonJS vs ES Modules](./04-commonjs-vs-es-modules.md): syntax, loading, strict mode
- [x] [What Happens When You Call require()](./05-require-under-the-hood.md): resolving, loading, wrapping, evaluating, caching

### Up next
- [ ] The event loop and libuv
- [ ] File system and `path` modules
- [ ] Streams and buffers
- [ ] The `http` module (building a server without Express)
- [ ] npm and `package.json`
- [ ] Async patterns: callbacks, promises, async/await
- [ ] More of the Node.js source code

## Repo structure
```
nodejs-notes/
├── README.md
├── 01-javascript-on-the-server.md
├── 02-getting-hands-on.md
├── 03-modules.md
├── 04-commonjs-vs-es-modules.md
└── 05-require-under-the-hood.md
```
Each note is one topic, numbered in the order I learned it.

## Biggest lesson so far
`require()` is not magic. Node resolves the file, loads it, wraps it in a function, runs it, and caches the result. Once I understood that, a lot of things (private module scope, `module.exports`, why a module only runs once) finally made sense.

## Where I'm headed
My main stack is PostgreSQL, Express, React and Node (plus Next.js and TypeScript). I want a strong foundation in Node.js so the backend side isn't guesswork.

## Contributions
These are personal notes, so I'm not looking for PRs. But if I got something wrong, please open an issue. I'd rather be corrected than keep a mistake in my notes.

## Connect
- GitHub: [@ShubhamPDev7](https://github.com/ShubhamPDev7)
- I post updates on LinkedIn under #LearningInPublic