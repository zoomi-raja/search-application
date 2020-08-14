const env = require("dotenv");
const express = require("express");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/error");
const fs = require("fs");
const cors = require("cors");
env.config({ path: "./config.env" });
const app = express();
app.use(express.json({ limit: "10kb" }));
app.use(cors());
const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`app running on port num ${port} ....`);
});

app.post("/api/search", (req, res) => {
	let filepath = `${__dirname}/sample_json/repositories.json`;
	if (req.body.entity == "users") {
		filepath = `${__dirname}/sample_json/user.json`;
	}
	fs.readFile(filepath, "utf8", function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		setTimeout(() => {
			res.setHeader("Content-Type", "application/json");
			const response = {
				status: "success",
				results: obj.items.length,
				data: { entity: req.body.entity, result: [...obj.items] },
			};
			res.status(200).json(response);
		}, 10);
	});
});
// handle 404
app.all("/api/*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl}`, 400));
});
app.use(globalErrorHandler);
