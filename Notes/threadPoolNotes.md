# Episode 10 --- Thread Pool in libuv

## 1. What is the libuv thread pool?

Node.js uses libuv to support asynchronous operations. For certain kinds
of work, libuv uses a pool of worker threads so that the work does not
have to run synchronously on the JavaScript main thread.

For example, some file-system operations and cryptographic functions use
the thread pool. When a worker is occupied with a task, it cannot work
on another task until it becomes available again.

## 2. Default thread-pool size

The default libuv thread-pool size covered in this lesson is **4
threads**.

``` text
UV_THREADPOOL_SIZE=4
```

If five operations need a worker at around the same time, four can
occupy the available workers and the remaining operation waits until a
worker becomes free. Do not rely on a fixed order for waiting work.

## 3. What kinds of work use the thread pool?

The lesson highlights: - File-system operations (`fs`) - Certain DNS
lookup operations - Cryptographic operations, such as hashing

Not every asynchronous operation uses the thread pool. In particular,
Node.js does not create one thread per incoming network connection.

## 4. Can the thread-pool size be changed?

The thread-pool size can be configured using the `UV_THREADPOOL_SIZE`
environment variable.

On macOS/Linux:

``` bash
UV_THREADPOOL_SIZE=8 node app.js
```

On Windows PowerShell:

``` powershell
$env:UV_THREADPOOL_SIZE = "8"
node app.js
```

Configure it before the pool is initialized. Increasing the number of
threads is not automatically faster; the right value depends on workload
and available system resources.

## 5. Is Node.js single-threaded or multi-threaded?

The answer depends on which part of Node.js is being discussed.

-   JavaScript callbacks generally run on the main JavaScript thread.
-   libuv can use worker threads for certain operations.
-   Network I/O is commonly handled through operating-system mechanisms
    rather than a dedicated thread per connection.

Node.js can use multiple threads internally even though ordinary
JavaScript execution is generally single-threaded on the main thread.

## 6. How does Node.js handle many network connections?

Creating a separate thread for every connection would be expensive at
scale. Instead, libuv works with operating-system I/O notification
mechanisms to monitor many sockets efficiently.

The lesson highlights: - **`epoll` on Linux** - **`kqueue` on macOS**

These mechanisms allow the operating system to monitor multiple file
descriptors (including sockets) and notify libuv when activity occurs.
This helps Node.js manage many connections without a separate thread for
every connection.

## 7. File descriptors and socket descriptors

A **file descriptor** is an operating-system handle used to refer to an
open resource, such as a file or socket, on Unix-like systems.

A **socket descriptor** refers to a socket used for network
communication. It is managed through the operating system and is not the
same thing as a JavaScript object.

## 8. Related Node.js concepts

The lesson also introduces a few topics to explore further.

### Event Emitters

The `EventEmitter` class from Node.js's `events` module lets an object
emit named events and lets other parts of an application listen for
them.

``` js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("ready", (message) => {
  console.log(message);
});

emitter.emit("ready", "Application is ready");
```

### Streams

Streams let an application read or write data incrementally rather than
needing to load an entire data source into memory at once. They are
useful for large files and network data.

### Buffers

Buffers represent binary data and are useful when working with file
contents, network packets, and other raw data.

### Pipes

Piping connects a readable stream to a writable stream, allowing data to
flow between them.

## 9. Practical takeaways

-   The libuv thread pool is used by certain operations, not every
    asynchronous task.
-   The default thread-pool size covered in this lesson is four.
-   Tasks may wait when all worker threads are occupied.
-   `UV_THREADPOOL_SIZE` can configure the pool size when set
    appropriately before initialization.
-   Node.js does not need one thread per incoming network connection.
-   `epoll` and `kqueue` are operating-system mechanisms used to monitor
    I/O activity.
-   The main JavaScript thread can still be blocked by long-running
    synchronous JavaScript code.

## 10. Further reading

-   [Node.js
    documentation](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop)
-   [libuv documentation](https://docs.libuv.org/)
-   [Node.js `EventEmitter`
    documentation](https://nodejs.org/api/events.html)
-   [Node.js Streams documentation](https://nodejs.org/api/stream.html)
-   [Node.js Buffer documentation](https://nodejs.org/api/buffer.html)
