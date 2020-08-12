const env = require("dotenv");
const express = require("express");
env.config({ path: "./config.env" });
const app = express();
app.use("/api", (req, res) => {
	res.status(200).json(["hello"]);
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`app running on port num ${port} ....`);
});
