/**
 * Created by kidroca on 30.11.2016 г..
 */
"use strict";

const fs = require("fs");
const path = require("path");

module.exports = requireModules;

/**
 * @param {object} params
 * @param {String} params.dir - absolute path to the directory
 * @param {function} [params.predicate]
 * @returns {object} namespace with objects
 */
function requireModules(params) {

    let modules = {};

    fs.readdirSync(params.dir)
      .filter(params.predicate || (file => file !== "index.js"))
      .forEach(file => {
          // noinspection Eslint
          let dataModule = require(path.join(params.dir, file));

          modules[file.split(".")[0]] = dataModule;
      });

    return modules;
}
