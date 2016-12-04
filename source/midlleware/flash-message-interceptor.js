/**
 * Created by kidroca on 4.12.2016 г..
 */
"use strict";

module.exports = (req, res, next) => {

    let messages = req.flash();
    Object.assign(res.locals, { messages });

    next();
};
