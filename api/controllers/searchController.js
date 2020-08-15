const fs = require("fs");
const search = (req, res) => {
	let filepath = `${__dirname}/../sample_json/repositories.json`;
	if (req.body.entity == "users") {
		filepath = `${__dirname}/../sample_json/user.json`;
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
		}, 1000);
	});
};
module.exports = search;
