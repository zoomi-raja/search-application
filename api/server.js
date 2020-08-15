const env = require("dotenv");
const app = require("./app/app");
const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`app running on port num ${port} ....`);
});
