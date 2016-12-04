/**
 * Created by kidroca on 4.12.2016 г..
 */
"use strict";

const InterceptError = require("../errors/intercept-error");

module.exports = (req, res, next) => {

    validateRequestData(req);

    if (req.team.creator === req.user.id) {
        next();
    }
    else {
        res.status(401).redirect("/unauthorized");
    }
};

function validateRequestData(req) {

    if (!req.team || !req.team.owner) {

        throw new InterceptError("Invalid `team` object. This middleware is supposed to run\n" +
            "after a middleware that will assign the `team` object");
    }

    if (!req.user || !req.user.id) {

        throw new InterceptError("Invalid `user` object. This middleware is supposed to run\n" +
            "after a middleware that will assign the `user` object");
    }
}
