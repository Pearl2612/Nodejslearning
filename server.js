const app = require("./src/app");

const PORT = process.env.DEV_APP_PORT;

const server = app.listen(PORT , () => {
	console.log(`Server on port ${PORT}`);
})

// process.on("SIGINT", () => {
// 	server.close(() => {
// 		console.log("Server closed");
// 		process.exit(0);
// 		//notification.ping("Server closed");
// 	})
// })