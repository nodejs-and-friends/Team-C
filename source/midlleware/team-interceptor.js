/**
 * Created by kidroca on 4.12.2016 г..
 */
"use strict";

const teams = require("../data/TeamRepository");

/**
 * Fetches the {@link Team} so it is available for following middleware and/or controllers
 * It will be available as `req.team`
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {

    if (!req.params.id) {
        notFound(req, res);
    }

    teams.get(req.params.id)
         .then(team => {
             if (team) {
                 req.team = team;
                 return next();
             }

             return notFound(req, res);
         });
};

function notFound(req, res) {

    req.flash("error", "No such team");
    res.status(404).redirect("back");
}
