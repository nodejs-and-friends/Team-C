/* globals require console */

const config = require("./config");

const app = require("./config/application");

const data = require("./data")(config);

require("./routers")(app, data);
// console.log(config);

// data.createTeam("Team A")
// 	.then(() => {
// 		console.log("Team A created");
// 	});

// data.getAllTeams()
// 	.then(() => {
// 		console.log("Teams listed");
// 	});

app.listen(config.port, () => console.log(`Running at: ${config.port}`));
