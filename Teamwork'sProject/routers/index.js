/* globals require module __dirname */
const fs = require("fs");
const path = require("path");

const express = require("express");

module.exports = function (app, data) {
	fs.readdirSync("./routers")
		.filter(x => x.includes("-router"))
		.forEach(file => {
			 require(path.join(__dirname, file))(app, data, express);		
		});
};