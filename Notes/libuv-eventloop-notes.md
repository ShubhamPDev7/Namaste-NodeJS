# Episode 09 --- libuv and the Event Loop

## 1. What is libuv?

**libuv** is a library used by Node.js to support its event loop and
asynchronous I/O. It helps Node.js handle operations such as file-system
work and certain networking and name-resolution tasks without making
JavaScript wait synchronously for every operation.

JavaScript execution in Node.js generally runs on the main thread, but
that does not mean every operation must block that thread until it
finishes.

## 2. The event loop, callback queues, and thread pool

### Event loop

The event loop coordinates when eligible callbacks are run. JavaScript
callbacks execute when the call stack is available; asynchronous work
can complete while other JavaScript code is running.

### Callback queues

When asynchronous work is ready for its callback to run, the callback is
scheduled for the appropriate event-loop phase or queue. The event loop
processes eligible callbacks according to Node.js/libuv's scheduling
rules.

### Thread pool

libuv also uses a worker thread pool for certain operations that should
not run as blocking work on the JavaScript thread. File-system
operations and some cryptographic operations are examples commonly
associated with this pool. Not every network operation uses the thread
pool; some I/O is handled by the operating system's event-notification
facilities.

## 3. What happens during an asynchronous file read?

A simplified example:

``` js
const fs = require("fs");

fs.readFile("notes.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});

console.log("This runs while the file read is pending.");
```

The broad idea is:

1.  JavaScript starts the file-read operation.
2.  Node.js/libuv arranges for the operation to be handled
    asynchronously.
3.  JavaScript continues executing other synchronous statements.
4.  When the operation completes, its callback becomes eligible to run.
5.  The callback runs when the event loop reaches the appropriate point
    and the JavaScript call stack can execute it.

This is one way Node.js supports non-blocking I/O.

## 4. The main event-loop phases

The lesson focuses on four important phases:

### Timers

Handles callbacks scheduled by `setTimeout()` and `setInterval()` when
their timers are eligible to run.

A delay of `0` does **not** mean "run immediately." It means the
callback can run after the minimum delay and when the event loop reaches
a suitable point.

### Poll

The poll phase handles many I/O-related callbacks and checks for I/O
events. When there is no work ready, the event loop may wait for
incoming events, depending on the state of the loop.

### Check

The check phase runs callbacks scheduled with `setImmediate()`.

### Close callbacks

This phase handles certain close-related callbacks, such as callbacks
associated with closing a socket.

A simplified phase overview:

``` text
        ┌─────────┐
        │ Timers  │
        └────┬────┘
             v
        ┌─────────┐
        │  Poll   │
        └────┬────┘
             v
        ┌─────────┐
        │  Check  │
        └────┬────┘
             v
        ┌────────────────┐
        │ Close callbacks│
        └────┬───────────┘
             └──── next loop iteration
```

This is a simplified teaching view, not a complete representation of
every internal detail or every Node.js version's event-loop behavior.

## 5. Microtasks: `process.nextTick()` and Promises

Node.js also schedules work outside the four phases shown above.

### `process.nextTick()`

Callbacks passed to `process.nextTick()` are processed after the current
JavaScript operation completes and before the event loop continues
normally. Excessive recursive `nextTick` scheduling can delay I/O, so it
should be used thoughtfully.

### Promise callbacks

Callbacks registered with `.then()`, `.catch()`, or `.finally()` are
Promise microtasks.

In common Node.js execution contexts, `process.nextTick()` callbacks are
processed before Promise microtasks. The precise scheduling details
depend on the execution context, so use small runnable examples to
verify ordering rather than memorizing one universal output sequence.

Example:

``` js
console.log("start");

process.nextTick(() => {
  console.log("nextTick");
});

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("end");
```

The synchronous output comes first:

``` text
start
end
```

In the usual CommonJS top-level context, the remaining output is:

``` text
nextTick
promise
```

## 6. `setTimeout()` vs `setImmediate()`

-   `setTimeout(callback, delay)` schedules a callback after a minimum
    delay, subject to event-loop scheduling.
-   `setImmediate(callback)` schedules a callback for the check phase.
-   Their relative order can depend on where they are scheduled and on
    timing. Do not assume that `setTimeout(fn, 0)` always runs before or
    after `setImmediate(fn)` in every situation.
-   When scheduled inside an I/O callback, `setImmediate()` commonly
    runs before a timer scheduled in that same callback.

Example to experiment with:

``` js
setTimeout(() => {
  console.log("timeout");
}, 0);

setImmediate(() => {
  console.log("immediate");
});
```

Run this more than once and then try placing the scheduling calls inside
an I/O callback. Observe how context affects the result.

## 7. Reading output-order examples

When tracing an event-loop example, separate the code into these
categories:

1.  **Synchronous statements** --- execute on the current call stack.
2.  **`process.nextTick()` callbacks** --- processed after the current
    operation in Node.js's next-tick queue.
3.  **Promise callbacks** --- run as microtasks.
4.  **Timers** --- become eligible after their delay and run according
    to event-loop scheduling.
5.  **I/O callbacks** --- become eligible when the associated operation
    completes.
6.  **`setImmediate()` callbacks** --- run in the check phase.

A useful debugging method is to label each callback, write down where it
is scheduled, and trace the order one step at a time. Keep in mind that
I/O completion timing and the Node.js version can affect observed
output.

## 8. Important takeaways

-   libuv supports Node.js's event loop and asynchronous I/O.
-   The event loop coordinates callback execution; it does not make a
    long-running synchronous JavaScript function non-blocking.
-   Some operations use libuv's thread pool, while many networking
    operations rely on operating-system facilities.
-   The four phases emphasized in this lesson are Timers, Poll, Check,
    and Close callbacks.
-   `process.nextTick()` and Promise callbacks have scheduling behavior
    distinct from the main phases.
-   A zero-millisecond timer is not an instruction to execute
    immediately.
-   `setTimeout()` and `setImmediate()` do not have one universal
    ordering in every context.
-   Blocking the JavaScript thread with CPU-heavy synchronous work can
    delay callbacks and I/O handling.

## 9. Further exploration

-   [Node.js
    documentation](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)
-   [libuv documentation](https://docs.libuv.org/)
