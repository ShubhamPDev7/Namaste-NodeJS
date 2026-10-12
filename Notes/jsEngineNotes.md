# Episode 08 --- Deep Dive into the V8 JavaScript Engine

## 1. What is V8?

V8 is a JavaScript engine used by environments such as Node.js and
Chromium-based browsers. It parses JavaScript, turns it into an internal
representation, and executes it. It can also optimize frequently
executed code to improve performance.

## 2. The parsing stage

Before JavaScript can execute, V8 needs to understand the structure of
the source code. Parsing includes lexical analysis and syntax analysis.

### Lexical analysis and tokenization

Lexical analysis breaks source code into smaller units called
**tokens**. Tokens can represent keywords, identifiers, operators,
literals, and punctuation.

Example:

``` js
var a = 10;
```

Possible tokens:

-   `var` --- keyword
-   `a` --- identifier
-   `=` --- operator
-   `10` --- literal
-   `;` --- punctuation

Tokenization makes the source code easier for later stages to analyze.

### Syntax analysis and the Abstract Syntax Tree (AST)

After tokenization, syntax analysis checks the tokens against
JavaScript's grammar and builds an **Abstract Syntax Tree (AST)**.

An AST is a tree-like structure that represents the code's syntax. For
the statement `var a = 10;`, it represents the variable declaration,
identifier `a`, and literal value `10`.

If the tokens do not follow JavaScript's syntax rules, the parser cannot
build a valid AST and a syntax error is reported.

You can inspect ASTs with tools such as [AST
Explorer](https://astexplorer.net/).

## 3. Is JavaScript interpreted or compiled?

JavaScript execution uses a combination of interpretation and
just-in-time (JIT) compilation. It is not accurate to describe modern
JavaScript engines as purely interpreters or purely ahead-of-time
compilers.

The notes describe this general flow:

1.  Parse the source code.
2.  Build an AST.
3.  Convert the code into bytecode.
4.  Execute the bytecode.
5.  Optimize frequently executed code where useful.

## 4. Ignition and bytecode

**Ignition** is V8's interpreter.

-   It takes the parsed program and produces bytecode.
-   Bytecode is an intermediate representation that is lower-level than
    the original JavaScript source.
-   Ignition executes the bytecode.

Bytecode is not the same thing as native machine code. It is an internal
representation used by the engine.

## 5. TurboFan and JIT optimization

**TurboFan** is V8's optimizing compiler.

-   Code that runs frequently is often called **hot code**.
-   The engine can optimize hot code by compiling it into optimized
    machine code.
-   Optimized machine code can make repeated execution faster.

### Deoptimization

Optimization relies on assumptions about the values and types the code
receives. If those assumptions stop holding, V8 may deoptimize the code
and return to a less optimized execution path.

For example, a function that usually receives numbers may be optimized
around that pattern. Passing values of a different type can invalidate
an optimization assumption.

**Practical takeaway:** write clear code and avoid unnecessary changes
in the types passed through performance-sensitive code. Do not assume
that every type variation automatically causes a performance problem;
optimization decisions are made by the engine.

## 6. Other optimization terms

-   **Inline caching:** caches information about property lookups to
    help make repeated property access faster.
-   **Copy elision:** avoids unnecessary copying in situations where an
    implementation can safely eliminate it.

These are optimization concepts; their exact use depends on the engine
and implementation.

## 7. High-level execution flow

``` text
JavaScript source
       |
       v
    Parsing
       |
       v
       AST
       |
       v
 Ignition interpreter
       |
       v
     Bytecode -----------------> Execution
       |
       | frequently executed code may be optimized
       v
 TurboFan compiler
       |
       v
Optimized machine code -------> Execution
       |
       | assumptions may become invalid
       v
 Deoptimization / less-optimized execution
```

This is a simplified learning diagram. Actual engine internals are more
complex, and optimization/deoptimization decisions are made dynamically.

## 8. Key takeaways

-   Lexical analysis breaks source code into tokens.
-   Syntax analysis uses those tokens to build an AST.
-   The AST represents the program's structure.
-   Ignition interprets bytecode.
-   TurboFan can optimize frequently executed code into machine code.
-   Deoptimization can occur when optimization assumptions no longer
    hold.
-   Understanding these stages helps explain how JavaScript execution
    works under the hood.

## 9. Further exploration

-   [V8 official website](https://v8.dev/)
-   [V8 source code on GitHub](https://github.com/v8/v8)
-   [AST Explorer](https://astexplorer.net/)
