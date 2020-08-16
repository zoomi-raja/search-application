const Redis = require("ioredis");
/**default values if environment variables are not set */
const host = process.env.REDIS_HOST || "redis";
const pass = process.env.REDIS_PASS || "tesT123";
const port = process.env.REDIS_PORT || "6379";

/**redis connection */
const client = new Redis(`redis://:${pass}@${host}:${port}/`);
client.on("error", (err) => {
	throw err;
});

module.exports = client;
