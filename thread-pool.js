const crypto = require("crypto");

process.env.UV_THREADPOOL_SIZE = "4";

console.log("Pool size:", process.env.UV_THREADPOOL_SIZE);

const start = Date.now();

for (let i = 1; i <= 5; i++) {
  crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
    if (err) throw err;

    console.log(`Job ${i} completed at ${Date.now() - start} ms`);
  });
}
