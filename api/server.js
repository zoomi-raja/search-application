const app = require("./app/app");
const { unhandledError } = require("./app/utils/utils");
const port = process.env.PORT || 3001;
let serverStarted = false;
app.listen(port, () => {
	console.log(`app running on port num ${port} ....`);
	serverStarted = true;
});
//process level exceptions/error
process.on("uncaughtException", unhandledError(app, serverStarted));
process.on("unhandledRejection", unhandledError(app, serverStarted));
