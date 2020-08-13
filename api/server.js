const env = require("dotenv");
const express = require("express");
const fs = require("fs");
const cors = require("cors");
env.config({ path: "./config.env" });
const app = express();
app.use(cors());
app.use("/api/search", (req, res) => {
	fs.readFile(`${__dirname}/sample_json/user.json`, "utf8", function (
		err,
		data
	) {
		if (err) throw err;
		obj = JSON.parse(data);
		setTimeout(() => {
			res.setHeader("Content-Type", "application/json");
			res.status(200).json(obj);
		}, 3000);
	});
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`app running on port num ${port} ....`);
});
