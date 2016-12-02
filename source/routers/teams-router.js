/* globals module require*/

const express = require("express");
// const toastr = require("../public/bower_components/toastr/toastr");


module.exports = function(app, data, express) {
	let router = new express.Router();
	let controller = require("../controllers/team-controller")(data);

	router.get('/', controller.getAll)
		.post('/accept/:teamId/:userId', controller.acceptUserForTeam)
		.post('/decline/:teamId/:userId', controller.declineUserForTeam)
		.post('/removeUser/:teamId/:userId', controller.removeUserForTeam)
		.get('/create', (req, res) => {
			res.render("team-create");
		})
		.get('/:id', controller.getById)
		.post('/', controller.create)
		.get('/update/:id', controller.getTeamForUpdateById)
		.post('/:id', controller.update)
		.get('/remove/:id', controller.remove)
		.post('/accept/', controller.acceptUserForTeam)
		.post('/join/:id', controller.addAppliedUser);
		
	app.use('/teams', router);
}