const Redis = require("ioredis");
const host = process.env.REDIS_HOST || "redis";
const pass = process.env.REDIS_PASS || "tesT123";
const port = process.env.REDIS_PORT || "6379";

const client = new Redis(`redis://:${pass}@${host}:${port}/`);
client.on("error", (err) => {
	throw err;
});

module.exports = client;
