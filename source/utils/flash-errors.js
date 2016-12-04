/**
 * Created by kidroca on 4.12.2016 г..
 */
"use strict";

module.exports = (flash, error) => {
    flash("error", error.message);

    let errors = error.errors || [];
    for (let msg of errors) {
        flash("error", msg);
    }
};
