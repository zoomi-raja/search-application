const env = require("dotenv");
const express = require("express");
const fs = require("fs");
env.config({ path: "./config.env" });
const app = express();
app.use("/api/search", (req, res) => {
	fs.readFile(`${__dirname}/sample_json/user.json`, "utf8", function (
		err,
		data
	) {
		if (err) throw err;
		obj = JSON.parse(data);
		res.status(200).json(obj);
	});
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`app running on port num ${port} ....`);
});
